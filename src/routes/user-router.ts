import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Router } from "express";
import { AddUserDto } from "../models/dtos/user-dtos";
import { responseDto } from "../tools/helper-functions";

const router = Router();

router.get(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userRepo = getRepository(User);

      const userList = await userRepo.find();

      response.status(200).send(responseDto({ data: { userList } }));
    } catch (error) {
      response.status(400).send(responseDto({ error }));
    }
  }
);

router.post(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userBody: AddUserDto = request.body;

      const userRepo = getRepository(User);

      // console.log({ userBody });

      const user: User = {
        ...userBody,
      };
      await userRepo.insert(user);
      response.status(201).send(responseDto({ data: true }));
    } catch (error) {
      console.log({ error });
      response.status(400).send(responseDto({ error }));
    }
  }
);

export default router;
