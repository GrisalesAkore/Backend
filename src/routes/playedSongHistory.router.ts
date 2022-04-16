import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository, getRepository } from "typeorm"
import { Category } from "../entity/core/enums"
import { PlayedSongHistory } from "../entity/PlayedSongHistory"
import PlayedSongHistoryRepository from "../repositories/playedSongHistory/PlayedSongHistory.repository"
import { PlayedSongHistoryDto } from "../repositories/playedSongHistory/PlayedSongHistory.repository.types"
import DateService from "../tools/DateService"
import { responseDto } from "../tools/helpers"
import _ = require("lodash")

const router = Router()

router.get("/recentlyPlayed/:userId", async (request: Request, response: Response<PlayedSongHistoryDto[]>, next: NextFunction) => {
  try {
    const { userId } = request.params
    const { limit = 10 } = request.query

    const playedSongHistoryRepo = getCustomRepository(PlayedSongHistoryRepository)

    const theLastTenSong = await playedSongHistoryRepo.getLastPlayedByUser(userId, limit)

    response.status(200).send(responseDto({ data: { theLastTenSong } }))
  } catch (error) {
    console.error(error)
    response.status(400).send(error)
  }
})

router.get("/recommended/:userId", async (request: Request, response: Response<PlayedSongHistoryDto[]>, next: NextFunction) => {
  try {
    const { userId } = request.params
    const { limit = 10 } = request.query

    const playedSongHistoryRepo = getCustomRepository(PlayedSongHistoryRepository)

    const theLastTenSong = await playedSongHistoryRepo.getLastPlayedByUser(userId, limit)
    const recommendedSongs = await (async () => {
      if (_.isEmpty(theLastTenSong)) {
        return playedSongHistoryRepo.getLastPlayed(limit)
      } else {
        const playedCategories = _(theLastTenSong)
          .map((songHistory) => songHistory.song.categories)
          .reduce((prev, next) => [...prev, ...next])
        const mostPlayedCategory = _.head(_(playedCategories).countBy().entries().maxBy(_.last)) as Category
        return playedSongHistoryRepo.getByCategoriesAndOrderByTime(mostPlayedCategory)
      }
    })()

    response.status(200).send(responseDto({ data: { recommendedSongs } }))
  } catch (error) {
    console.error(error)
    response.status(400).send(error)
  }
})

router.put("/play/:songId/:userId", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { songId, userId } = request.params

    const playedSong: PlayedSongHistory = {
      song: songId,
      user: userId,
      playedTime: DateService.now()
    }
    getRepository(PlayedSongHistory).insert(playedSong)

    response.status(200).send(responseDto({ data: true }))
  } catch (error) {
    console.error(error)
    response.status(400).send(error)
  }
})

export default router
