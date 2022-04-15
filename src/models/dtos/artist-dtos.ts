import { Category } from "../enums";
import { Artist } from "../../entity/Artist";

export type AddArtistDto = {
  name: string;
  bgPhoto: string;
  photo: string;
  categories: Category[];
};
