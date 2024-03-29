import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Comment } from "./Comment"
import { BaseEntity } from "./core/BaseEntity"
import { Like } from "./Like"
import { Song } from "./Song"
import { User } from "./User"

@Entity()
export class SongList extends BaseEntity {
  @Column()
  name: string

  @Column()
  bgPhoto: string

  @OneToMany((type) => Comment, (comment) => comment.songList)
  comments: Comment[]

  @ManyToOne(() => User, (user) => user.songLists)
  user: User

  @OneToMany((type) => Like, (like) => like.songList)
  likes: Like[]

  @ManyToMany((type) => Song)
  @JoinTable()
  songs: Song[]
}
