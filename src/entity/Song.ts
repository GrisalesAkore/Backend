import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Category } from "../models/enums";
import { Artist } from "./Artist";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { PlayedSongHistory } from "./PlayedSongHistory";
import { SongList } from "./SongList";

@Entity()
export class Song {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column("simple-array")
    categories: Category[];

    @ManyToOne(() => Artist, artist => artist.songs)
    artist: Artist;
    
    @OneToMany(type => Comment, comment => comment.song)
    comments: Comment[];

    @OneToMany(type => Like, like => like.song)
    likes: Like[];

    @OneToMany(type => PlayedSongHistory, playedSongHistory => playedSongHistory.song)
    playedSongHistories: PlayedSongHistory[];

    @ManyToMany(type => SongList)
    @JoinTable()
    songLists: SongList[];
}
