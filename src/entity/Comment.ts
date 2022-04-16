import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { Artist } from "./Artist"
import { BaseEntity } from "./core/BaseEntity"
import { Like } from "./Like"
import { Song } from "./Song"
import { SongList } from "./SongList"

@Entity()
export class Comment extends BaseEntity {
  @Column()
  content: string

  @ManyToOne((type) => SongList, (songList) => songList.comments)
  songList: SongList

  @ManyToOne((type) => Song, (song) => song.comments)
  song: Song

  @ManyToOne((type) => Artist, (artist) => artist.comments)
  artist: Artist

  @OneToMany((type) => Like, (like) => like.comment)
  likes: Like[]
}
