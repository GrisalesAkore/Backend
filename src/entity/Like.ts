import { Entity, ManyToOne } from "typeorm"
import { Artist } from "./Artist"
import { Comment } from "./Comment"
import { BaseEntity } from "./core/BaseEntity"
import { Song } from "./Song"
import { SongList } from "./SongList"

@Entity()
export class Like extends BaseEntity {
  @ManyToOne((type) => Artist, (artist) => artist.likes)
  artist: Artist

  @ManyToOne((type) => Comment, (comment) => comment.likes)
  comment: Comment

  @ManyToOne((type) => Song, (song) => song.likes)
  song: Song

  @ManyToOne((type) => SongList, (songList) => songList.likes)
  songList: SongList
}
