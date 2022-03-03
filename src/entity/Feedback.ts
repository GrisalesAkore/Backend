import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Category } from "../models/enums";
import { User } from "./User";

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(type => User, user => user.feedbacks)
    user: User;
}
