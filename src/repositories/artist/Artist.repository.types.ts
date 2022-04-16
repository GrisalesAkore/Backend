import { Category } from "../../entity/core/enums";

export type ArtistDao = {
  name: string;
  bgPhoto: string;
  photo: string;
  categories: Category[];
};
