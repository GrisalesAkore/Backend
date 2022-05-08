import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository } from "typeorm"
import SongRepository from "../repositories/song/Song.repository"
import { EditSongDao, SongDao, SongDto } from "../repositories/song/Song.repository.types"
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

    const song = await songRepo.getById(songId)

    response.status(200).send(responseDto({ data: song }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

router.put("/:songId", async (request: Request<EditSongDao>, response: Response, next: NextFunction) => {
  try {
    const { songId } = request.params
    const songBody: EditSongDao = request.body
    const songRepo = getCustomRepository(SongRepository)

    const song = await songRepo.getById(songId)
    const copy = `
Am&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E
Ağlamadan ayrılık olmaz hatıralar uslu durmaz
Am&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E
Kalanlar gideni gönlünde taşır aşk sevene yük olmaz
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Am
Biz böyle bilir böyle yaşarız
Am Dm G&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Am &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dm G E &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Am
Oo ooo oo o da biliyor, oo ooo oo o da seviyor
&nbsp;&nbsp;Dm G C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F   
Oo ooo oo bile bile kafa tutuyor aşka
`

    if (songBody.title) song.title = songBody.title
    if (songBody.content) song.content = copy
    if (songBody.categories) song.categories = songBody.categories

    await songRepo.save(song)
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
