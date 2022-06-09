import { groupBy } from "lodash"
import { EntityRepository, Repository } from "typeorm"
import { Category } from "../../entity/core/enums"
import { PlayedSongHistory } from "../../entity/PlayedSongHistory"
import { PlayedSongHistoryDto, PlayedSongHistoryDao, RecentlyPlayedSongDto } from "./PlayedSongHistory.repository.types"

@EntityRepository(PlayedSongHistory)
class PlayedSongHistoryRepository extends Repository<PlayedSongHistory> {
  getRecommendsByCategory(mostPlayedCategory: Category, limit: number = 10) {
    return this.createQueryBuilder("playedHistory")
      .select(["playedHistory.id", "playedHistory.playedTime", "song.id", "song.title", "song.categories"])
      .leftJoinAndSelect("playedHistory.song", "song")
      .where("song.categories IN (:categories)", {
        categories: mostPlayedCategory
      })
      .orderBy("playedHistory.playedTime", "DESC")
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getLastPlayedByUser(userId: number, limit: number = 10) {
    return this.query(
      `
      SELECT DISTINCT song.id as "songId", MAX(ps."playedTime") as "playedTime", song.categories, song.title, artist."name" as "artistName" 
      FROM played_song_history ps 
      LEFT JOIN song ON ps."songId" = song.id 
      LEFT JOIN artist on song."artistId" = artist.id  
      WHERE ps."userId" = $1
      GROUP BY song.id, artist.id 
      ORDER BY MAX(ps."playedTime") DESC, song.id
      LIMIT $2
    `,
      [userId, limit]
    ) as Promise<any>
  }

  getLastPlayed(limit: number = 10) {
    return this.createQueryBuilder("playedSongHistory")
      .orderBy("playedSongHistory.playedTime", "DESC")
      .leftJoinAndSelect("playedSongHistory.song", "song")
      .leftJoinAndSelect("song.artist", "artist")
      .select(["playedSongHistory.id", "playedSongHistory.playedTime", "song.id", "song.title", "song.categories", "artist.name"])
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getByCategoriesAndOrderByTime(mostPlayedCategory: Category, limit: number = 10) {
    return this.createQueryBuilder("playedHistory")
      .leftJoinAndSelect("playedHistory.song", "song")
      .leftJoinAndSelect("song.artist", "artist")
      .where("song.categories IN (:categories)", {
        categories: mostPlayedCategory
      })
      .orderBy("playedHistory.playedTime", "DESC")
      .select(["playedHistory.id", "playedHistory.playedTime", "song.id", "song.title", "song.categories", "artist.name"])
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getPopularByDate(date: Date, limit: number = 10) {
    return this.query(
      `
      SELECT DISTINCT song.id as "songId", COUNT(song.id) as "countOfPlayed", song.categories, song.title, artist."name" as "artistName" 
      FROM played_song_history ps 
      LEFT JOIN song ON ps."songId" = song.id 
      LEFT JOIN artist on song."artistId" = artist.id  
      WHERE ps."playedTime" >= $1
      GROUP BY song.id, artist.id 
      ORDER BY COUNT(song.id) DESC, song.id
      LIMIT $2
    `,
      [date, limit]
    ) as Promise<any>
  }

  add(playedSongHistory: PlayedSongHistory) {
    return this.insert(playedSongHistory)
  }
}

export default PlayedSongHistoryRepository
