import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Category } from "../models/enums";
import { Artist } from "./Artist";
import { Comment } from "./Comment";
import { Song } from "./Song";
import { SongList } from "./SongList";

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Artist, artist => artist.likes)
    artist: Artist;

    @ManyToOne(type => Comment, comment => comment.likes)
    comment: Comment;

    @ManyToOne(type => Song, song => song.likes)
    song: Song;

    @ManyToOne(type => SongList, songList => songList.likes)
    songList: SongList;
}
