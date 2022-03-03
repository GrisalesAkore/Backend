import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Category } from "../models/enums";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Song } from "./Song";
import { User } from "./User";

@Entity()
export class SongList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bgPhoto: string;

    @OneToMany(type => Comment, comment => comment.songList)
    comments: Comment[];
    
    @ManyToOne(() => User, user => user.songLists)
    user: User;

    @OneToMany(type => Like, like => like.songList)
    likes: Like[];
    
    @ManyToMany(type => Song)
    @JoinTable()
    songs: Song[];
}
