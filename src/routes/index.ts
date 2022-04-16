import { Router } from "express"

import artistRouter from "./artist.router"
import playedSongHistory from "./playedSongHistory.router"
import songRouter from "./song.router"
import userRouter from "./user.router"

const router = Router()

// Routes
router.use("/user", userRouter)
router.use("/song", songRouter)
router.use("/artist", artistRouter)
router.use("/playedSongHistory", playedSongHistory)

export default router
