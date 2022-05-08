import { EntityRepository, Repository } from "typeorm"
import { Song } from "../../entity/Song"
import { SongDto } from "./song.repository.types"
import { SongDao } from "./Song.repository.types"

@EntityRepository(Song)
class SongRepository extends Repository<Song> {
  get(limit: number = 10) {
    return this.createQueryBuilder("song")
      .leftJoinAndSelect("song.artist", "artist")
      .select(["song.id", "song.title", "song.content", "song.categories", "artist.id", "artist.name"])
      .take(limit)
      .getMany() as Promise<SongDto[]>
  }

  getById(songId: number) {
    return this.createQueryBuilder("song")
      .leftJoinAndSelect("song.artist", "artist")
      .select(["song.id", "song.title", "song.content", "song.categories", "artist.id", "artist.name"])
      .where("song.id = :songId", { songId })
      .getOneOrFail() as Promise<SongDto>
  }

  add(song: SongDao) {
    return this.insert(song)
  }
}

export default SongRepository
