import { EntityRepository, getRepository, Repository } from "typeorm";
import { Song } from "../../entity/Song";
import { Category } from "../../entity/core/enums";
import { PlayedSongHistory } from "../../entity/PlayedSongHistory";
import { SongDto } from "./song.repository.types";
import { SongDao } from "./Song.repository.types";

@EntityRepository(Song)
class SongRepository extends Repository<Song> {
  get() {
    return this.createQueryBuilder("song")
      .leftJoinAndSelect("song.artist", "artist")
      .select([
        "song.id",
        "song.title",
        "song.content",
        "song.categories",
        "artist.id",
      ])
      .getMany() as Promise<SongDto[]>;
  }

  add(song: SongDao) {
    return this.insert(song);
  }
}

export default SongRepository;
