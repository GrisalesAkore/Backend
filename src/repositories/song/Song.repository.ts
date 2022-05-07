import { EntityRepository, Repository } from "typeorm"
import { Song } from "../../entity/Song"
import { SongDto } from "./song.repository.types"
import { SongDao } from "./Song.repository.types"

@EntityRepository(Song)
class SongRepository extends Repository<Song> {
  get(songId?: number, limit: number = 10) {
    const query = this.createQueryBuilder("song")
      .leftJoinAndSelect("song.artist", "artist")
      .select(["song.id", "song.title", "song.content", "song.categories", "artist.id"])

    if (songId) {
      query.where("song.id = :songId", { songId })
      return query.getOneOrFail() as Promise<SongDto>
    }

    return query.take(limit).getMany() as Promise<SongDto[]>
  }

  add(song: SongDao) {
    return this.insert(song)
  }
}

export default SongRepository
