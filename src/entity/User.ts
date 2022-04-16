import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SearchedInfo } from "./core/models";
import { BaseEntity } from "./core/BaseEntity";
import { Feedback } from "./Feedback";
import { PlayedSongHistory } from "./PlayedSongHistory";
import { SongList } from "./SongList";

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  bgPhoto?: string;

  @Column({ type: "simple-json", nullable: true, default: [] })
  searchedInfo?: SearchedInfo[];

  @OneToMany((type) => Feedback, (feedback) => feedback.user)
  feedbacks?: Feedback[];

  @OneToMany((type) => SongList, (songList) => songList.user)
  songLists?: SongList[];

  @OneToMany(
    (type) => PlayedSongHistory,
    (playedSongHistory) => playedSongHistory.user
  )
  playedSongHistories?: PlayedSongHistory[];
}
