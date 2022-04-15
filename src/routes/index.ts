import { Router } from "express";

import userRouter from "./user-router";
import songRouter from "./song-router";
import artistRouter from "./artist-router";

const router = Router();

// Routes
router.use("/user", userRouter);
router.use("/song", songRouter);
router.use("/artist", artistRouter);

export default router;
