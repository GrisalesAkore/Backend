import { getRepository, getCustomRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Router } from "express";
import { responseDto } from "../tools/helpers";
import { UserDao } from "../repositories/user/User.types";
import UserRepository from "../repositories/user/User.repository";

const router = Router();

router.post(
  "",
  async (request: Request<UserDao>, response: Response, next: NextFunction) => {
    try {
      const user: UserDao = request.body;
      const userRepo = getCustomRepository(UserRepository);

      await userRepo.add(user);

      response.status(201).send(responseDto({ data: true }));
    } catch (error) {
      console.log({ error });
      response.status(400).send(responseDto({ error }));
    }
  }
);

export default router;
