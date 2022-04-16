import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Artist } from "./Artist"
import { Comment } from "./Comment"
import { BaseEntity } from "./core/BaseEntity"
import { Category } from "./core/enums"
import { Like } from "./Like"
import { PlayedSongHistory } from "./PlayedSongHistory"
import { SongList } from "./SongList"

@Entity()
export class Song extends BaseEntity {
  @Column()
  title: string

  @Column()
  content: string

  @Column("simple-array")
  categories: Category[]

  @ManyToOne(() => Artist, (artist) => artist.songs, {
    eager: true
  })
  artist: Artist

  @OneToMany((type) => Comment, (comment) => comment.song)
  comments?: Comment[]

  @OneToMany((type) => Like, (like) => like.song)
  likes?: Like[]

  @OneToMany((type) => PlayedSongHistory, (playedSongHistory) => playedSongHistory.song)
  playedSongHistories?: PlayedSongHistory[]

  @ManyToMany((type) => SongList)
  @JoinTable()
  songLists?: SongList[]
}
