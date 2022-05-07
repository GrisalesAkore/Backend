import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository } from "typeorm"
import SongRepository from "../repositories/song/Song.repository"
import { SongDao, SongDto } from "../repositories/song/Song.repository.types"
import { responseDto } from "../tools/helpers"

const router = Router()

router.get("", async (request: Request, response: Response<SongDto[]>, next: NextFunction) => {
  try {
    const songRepo = getCustomRepository(SongRepository)

    const songList = await songRepo.get()

    response.status(200).send(responseDto({ data: { songList } }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})
router.get("/:songId", async (request: Request, response: Response<SongDto[]>, next: NextFunction) => {
  try {
    const { songId } = request.params
    const songRepo = getCustomRepository(SongRepository)

    const song = await songRepo.get(songId)

    response.status(200).send(responseDto({ data: song }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

router.post("", async (request: Request<SongDao>, response: Response, next: NextFunction) => {
  try {
    const song: SongDao = request.body
    const songRepo = getCustomRepository(SongRepository)

    await songRepo.add(song)
    response.status(201).send(responseDto({ data: true }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

export default router
