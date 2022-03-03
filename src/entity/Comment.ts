import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "../models/enums";
import { Artist } from "./Artist";
import { Like } from "./Like";
import { Song } from "./Song";
import { SongList } from "./SongList";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(type => SongList, songList => songList.comments)
    songList: SongList;

    @ManyToOne(type => Song, song => song.comments)
    song: Song;

    @ManyToOne(type => Artist, artist => artist.comments)
    artist: Artist;

    @OneToMany(type => Like, like => like.comment)
    likes: Like[];
}