import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm"
import DateService from "../tools/DateService"
import { BaseEntity } from "./core/BaseEntity"
import { Song } from "./Song"
import { User } from "./User"

@Entity()
export class PlayedSongHistory extends BaseEntity {
  @Column({ nullable: true, default: new Date() })
  playedTime?: Date

  @ManyToOne((type) => Song, (song) => song.playedSongHistories)
  song: Song

  @ManyToOne((type) => User, (user) => user.playedSongHistories)
  user: User
}
