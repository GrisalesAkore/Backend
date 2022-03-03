import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { SearchedInfo } from '../../.history/src/models/model_20220303180226';
import { Feedback } from "./Feedback";
import { PlayedSongHistory } from "./PlayedSongHistory";
import { SongList } from "./SongList";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token: string;

    @Column()
    photo: string;

    @Column()
    bgPhoto: string;

    @Column("simple-json")
    searchedInfo: SearchedInfo;

    @OneToMany(type => Feedback, feedback => feedback.user)
    feedbacks: Feedback[];

    @OneToMany(type => SongList, songList => songList.user)
    songLists: SongList[];

    @OneToMany(type => PlayedSongHistory, playedSongHistory => playedSongHistory.user)
    playedSongHistories: PlayedSongHistory[];
}
