import { Category } from "../enums";
import { Artist } from "../../entity/Artist";
import { Comment } from "../../entity/Comment";
import { Like } from "../../entity/Like";
import { PlayedSongHistory } from "../../entity/PlayedSongHistory";

export type AddSongDto = {
  title: string;
  content: string;
  categories: Category[];
  artist: Artist;
};

export type GetSongListDto = {
  title: string;
  content: string;
  categories: Category[];
  artist: Artist;
};
