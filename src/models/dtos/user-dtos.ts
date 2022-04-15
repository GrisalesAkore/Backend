import { Category } from "../enums";
import { Artist } from "../../entity/Artist";
import { SearchedInfo } from "../model";
import { Feedback } from "../../entity/Feedback";

export type AddUserDto = {
  name: string;

  email: string;

  password: string;

  token: string;

  photo?: string;

  bgPhoto?: string;
};
