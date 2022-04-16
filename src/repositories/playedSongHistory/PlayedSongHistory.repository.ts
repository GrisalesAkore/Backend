import { EntityRepository, Repository } from "typeorm"
import { Category } from "../../entity/core/enums"
import { PlayedSongHistory } from "../../entity/PlayedSongHistory"
import { PlayedSongHistoryDto } from "./PlayedSongHistory.repository.types"

@EntityRepository(PlayedSongHistory)
class PlayedSongHistoryRepository extends Repository<PlayedSongHistory> {
  getRecommendsByCategory(mostPlayedCategory: Category, limit: number = 10) {
    return this.createQueryBuilder("playedHistory")
      .select(["playedHistory.id", "playedHistory.playedTime", "song.id", "song.categories"])
      .leftJoinAndSelect("playedHistory.song", "song")
      .where("song.categories IN (:categories)", {
        categories: mostPlayedCategory
      })
      .orderBy("playedHistory.playedTime", "DESC")
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getLastPlayedByUser(userId: number, limit: number = 10) {
    return this.createQueryBuilder("playedSongHistory")
      .where("playedSongHistory.user = :userId", { userId })
      .orderBy("playedSongHistory.playedTime", "DESC")
      .leftJoinAndSelect("playedSongHistory.song", "song")
      .select(["playedSongHistory.id", "playedSongHistory.playedTime", "song.id", "song.categories"])
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getLastPlayed(limit: number = 10) {
    return this.createQueryBuilder("playedSongHistory")
      .orderBy("playedSongHistory.playedTime", "DESC")
      .leftJoinAndSelect("playedSongHistory.song", "song")
      .select(["playedSongHistory.id", "playedSongHistory.playedTime", "song.id", "song.categories"])
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }

  getByCategoriesAndOrderByTime(mostPlayedCategory: Category, limit: number = 10) {
    return this.createQueryBuilder("playedHistory")
      .leftJoinAndSelect("playedHistory.song", "song")
      .where("song.categories IN (:categories)", {
        categories: mostPlayedCategory
      })
      .orderBy("playedHistory.playedTime", "DESC")
      .select(["playedHistory.id", "playedHistory.playedTime", "song.id", "song.categories"])
      .take(limit)
      .getMany() as Promise<PlayedSongHistoryDto[]>
  }
}

export default PlayedSongHistoryRepository

// export function getRecommendsByCategory(
//   mostPlayedCategory: Category,
//   limit: number = 10
// ) {
//   return getRepository(PlayedSongHistory)
//     .createQueryBuilder("playedHistory")
//     .select(["playedHistory.id", "playedHistory.playedTime", "song.categories"])
//     .leftJoinAndSelect("playedHistory.song", "song")
//     .where("song.categories IN (:categories)", {
//       categories: mostPlayedCategory,
//     })
//     .orderBy("playedHistory.playedTime", "DESC")
//     .take(limit)
//     .getMany() as Promise<GetRecommendsByCategoryRepo[]>;
// }
