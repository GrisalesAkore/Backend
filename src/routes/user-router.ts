import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Router } from 'express';


const router = Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    try {
        // const userList = await userRepository.find();
        // response.status(200).send(userList);
    } catch (error) {
        // response.status(400).send(error);
    }
});

// router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const userList = await userRepository.findOne(request.params.id);
//         response.status(200).send(userList);
//     } catch (error) {
//         response.status(400).send(error);
//     }
// });

// router.post("/", async (request: Request, response: Response, next: NextFunction) => {
//     const createdUser = await userRepository.findOne(request.params.id);
//     request.status(201).send(createdUser);
// });

// router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
//     const userToRemove = await userRepository.findOne(request.params.id);
//     await userRepository.remove(userToRemove);
//     request.status(200).send("silindi")
// });

export default router;