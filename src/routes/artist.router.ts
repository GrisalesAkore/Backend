import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository } from "typeorm"
import ArtistRepository from "../repositories/artist/Artist.repository"
import { ArtistDao } from "../repositories/artist/Artist.repository.types"
import { responseDto } from "../tools/helpers"

const router = Router()

router.post("", async (request: Request<ArtistDao>, response: Response, next: NextFunction) => {
  try {
    const artist: ArtistDao = request.body
    const artistRepo = getCustomRepository(ArtistRepository)

    await artistRepo.add(artist)
    response.status(201).send(responseDto({ data: true }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

export default router
