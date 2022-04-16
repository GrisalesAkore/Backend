import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./core/enums";
import { BaseEntity } from "./core/BaseEntity";
import { Song } from "./Song";
import { User } from "./User";

@Entity()
export class PlayedSongHistory extends BaseEntity {
  @Column()
  playedTime: Date;

  @ManyToOne((type) => Song, (song) => song.playedSongHistories)
  song: Song;

  @ManyToOne((type) => User, (user) => user.playedSongHistories)
  user: User;
}
