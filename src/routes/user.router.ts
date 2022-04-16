import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/user/User.repository"
import { UserDao } from "../repositories/user/User.types"
import { responseDto } from "../tools/helpers"

const router = Router()

router.post("", async (request: Request<UserDao>, response: Response, next: NextFunction) => {
  try {
    const user: UserDao = request.body
    const userRepo = getCustomRepository(UserRepository)

    await userRepo.add(user)

    response.status(201).send(responseDto({ data: true }))
  } catch (error) {
    console.log({ error })
    response.status(400).send(responseDto({ error }))
  }
})

export default router
