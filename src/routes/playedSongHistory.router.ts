import { NextFunction, Request, Response, Router } from "express"
import { getCustomRepository } from "typeorm"
import { Category } from "../entity/core/enums"
import { PlayedSongHistory } from "../entity/PlayedSongHistory"
import PlayedSongHistoryRepository from "../repositories/playedSongHistory/PlayedSongHistory.repository"
import { PlayedSongHistoryDto, RecentlyPlayedSongDto } from "../repositories/playedSongHistory/PlayedSongHistory.repository.types"
import { responseDto } from "../tools/helpers"
import _ = require("lodash")
import DateService from "../tools/DateService"

const router = Router()

router.get("/recentlyPlayed/:userId", async (request: Request, response: Response<any[]>, next: NextFunction) => {
  try {
    const { userId } = request.params
    const { limit = 10 } = request.query

    const playedSongHistoryRepo = getCustomRepository(PlayedSongHistoryRepository)

    const theLastTenSong = await playedSongHistoryRepo.getLastPlayedByUser(userId, limit)

    response.status(200).send(responseDto({ data: theLastTenSong }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
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
          .map((song) => song.categories.split(","))
          .reduce((prev, next) => [...prev, ...next])
        const mostPlayedCategory = _.head(_(playedCategories).countBy().entries().maxBy(_.last)) as Category
        return playedSongHistoryRepo.getByCategoriesAndOrderByTime(mostPlayedCategory)
      }
    })()

    response.status(200).send(responseDto({ data: recommendedSongs }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

router.get("/popularByDate", async (request: Request, response: Response<PlayedSongHistoryDto[]>, next: NextFunction) => {
  try {
    const { limit = 10, date } = request.query

    const playedSongHistoryRepo = getCustomRepository(PlayedSongHistoryRepository)

    const popularSongByDate = await playedSongHistoryRepo.getPopularByDate(date, limit)

    response.status(200).send(responseDto({ data: popularSongByDate }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

router.put("/play/:songId/:userId", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { songId, userId } = request.params
    const playedSongHistoryRepo = getCustomRepository(PlayedSongHistoryRepository)

    const playedSong: PlayedSongHistory = {
      song: songId,
      user: userId,
      playedTime: DateService.now()
    }
    playedSongHistoryRepo.add(playedSong)

    response.status(200).send(responseDto({ data: true }))
  } catch (error) {
    console.error(error)
    response.status(400).send(responseDto({ error }))
  }
})

export default router
