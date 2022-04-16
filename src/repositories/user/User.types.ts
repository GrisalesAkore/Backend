import { Category } from "../../entity/core/enums";

export type UserDao = {
  name: string;
  email: string;
  password: string;
  token: string;
  photo?: string;
  bgPhoto?: string;
};
