import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Category } from "../models/enums";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Song } from "./Song";
import { User } from "./User";

// @TODO: Photo type'lar düzenlenecek
@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bgPhoto: string;

    @Column()
    photo: string;

    @Column("simple-array")
    categories: Category[];

    @OneToMany(type => Song, song => song.artist)
    songs: Song[];

    @OneToMany(type => Like, like => like.artist)
    likes: Like[];

    @OneToMany(type => Comment, comment => comment.artist)
    comments: Comment[];
}
