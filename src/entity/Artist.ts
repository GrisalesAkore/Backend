import { Column, Entity, OneToMany } from "typeorm"
import { Comment } from "./Comment"
import { BaseEntity } from "./core/BaseEntity"
import { Category } from "./core/enums"
import { Like } from "./Like"
import { Song } from "./Song"

// @TODO: Photo type'lar düzenlenecek
@Entity()
export class Artist extends BaseEntity {
  @Column()
  name: string

  @Column()
  bgPhoto: string

  @Column()
  photo: string

  @Column("simple-array")
  categories: Category[]

  @OneToMany((type) => Song, (song) => song.artist)
  songs?: Song[]

  @OneToMany((type) => Like, (like) => like.artist)
  likes?: Like[]

  @OneToMany((type) => Comment, (comment) => comment.artist)
  comments?: Comment[]
}
