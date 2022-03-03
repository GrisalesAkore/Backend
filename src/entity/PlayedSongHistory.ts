import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Category } from "../models/enums";
import { Song } from "./Song";
import { User } from "./User";

@Entity()
export class PlayedSongHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playedTime: number;
    
    @ManyToOne(type => Song, song => song.playedSongHistories)
    song: Song;
    
    @ManyToOne(type => User, user => user.playedSongHistories)
    user: User;
}
