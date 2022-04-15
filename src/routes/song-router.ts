import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { PlayedSongHistory } from "../entity/PlayedSongHistory";
import { Router } from "express";
import DateService from "../tools/DateService";
import { responseDto } from "../tools/helper-functions";
import { Song } from "../entity/Song";
import { AddSongDto, GetSongListDto } from "../models/dtos/song-dtos";
import { Category } from "../models/enums";
import _ = require("lodash");

const router = Router();

router.get(
  "/recentlyPlayed/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request.params;
      const { limit = 10 } = request.query;

      const playedSongHistoryRepo = getRepository(PlayedSongHistory);

      const theLastTenSong = await playedSongHistoryRepo
        .createQueryBuilder("playedSongHistory")
        .where("playedSongHistory.user = :userId", { userId })
        .orderBy("playedSongHistory.playedTime", "DESC")
        .leftJoinAndSelect("playedSongHistory.song", "song")
        .select([
          "playedSongHistory.id",
          "playedSongHistory.playedTime",
          "song.id",
        ])
        .take(limit)
        .getMany();

      response.status(200).send(theLastTenSong);
    } catch (error) {
      console.error(error);
      response.status(400).send(error);
    }
  }
);

router.get(
  "/recommended/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request.params;
      const { limit = 10 } = request.query;

      const playedSongHistoryRepo = getRepository(PlayedSongHistory);
      let recommendedSongs = [];

      const theLastTenSong = (await playedSongHistoryRepo
        .createQueryBuilder("playedSongHistory")
        .where("playedSongHistory.user = :userId", { userId })
        .orderBy("playedSongHistory.playedTime", "DESC")
        .leftJoinAndSelect("playedSongHistory.song", "song")
        .select([
          "playedSongHistory.id",
          "playedSongHistory.playedTime",
          "song.categories",
        ])
        .take(limit)
        .getMany()) as {
        id: number;
        playedTime: Date;
        song: {
          categories: Category[];
        };
      }[];

      if (_.isEmpty(theLastTenSong)) {
        recommendedSongs = await playedSongHistoryRepo
          .createQueryBuilder("playedSongHistory")
          .orderBy("playedSongHistory.playedTime", "DESC")
          .leftJoinAndSelect("playedSongHistory.song", "song")
          .select([
            "playedSongHistory.id",
            "playedSongHistory.playedTime",
            "song.categories",
          ])
          .take(limit)
          .getMany();
      } else {
        const playedCategories = _(theLastTenSong)
          .map((songHistory) => songHistory.song.categories)
          .reduce((prev, next) => [...prev, ...next]);

        const mostPlayedCategory = _.head(
          _(playedCategories).countBy().entries().maxBy(_.last)
        );
        console.log(mostPlayedCategory);
        recommendedSongs = await playedSongHistoryRepo
          .createQueryBuilder("playedHistory")
          .select([
            "playedHistory.id",
            "playedHistory.playedTime",
            "song.categories",
          ])
          .leftJoinAndSelect("playedHistory.song", "song")
          .where("song.categories IN (:categories)", {
            categories: mostPlayedCategory,
          })
          .orderBy("playedHistory.playedTime", "DESC")
          .take(limit)
          .getMany();
      }

      response.status(200).send(recommendedSongs);
    } catch (error) {
      console.error(error);
      response.status(400).send(error);
    }
  }
);

router.put(
  "/play/:songId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { songId, userId } = request.params;

      const playedSong: PlayedSongHistory = {
        song: songId,
        user: userId,
        playedTime: DateService.now(),
      };
      getRepository(PlayedSongHistory).insert(playedSong);

      response.status(200).send(responseDto({ data: true }));
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.get(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const songRepo = getRepository(Song);

      const songList = await songRepo
        .createQueryBuilder("song")
        .leftJoinAndSelect("song.artist", "artist")
        .select([
          "song.id, song.title",
          "song.content",
          "song.categories",
          "artist.id",
        ])
        .getMany();

      response.status(200).send(responseDto({ data: { songList } }));
    } catch (error) {
      response.status(400).send(responseDto({ error }));
    }
  }
);

router.post(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const songBody: AddSongDto = request.body;

      const song: Song = {
        ...songBody,
      };
      await getRepository(Song).insert(song);
      response.status(201).send(responseDto({ data: true }));
    } catch (error) {
      response.status(400).send(responseDto({ error }));
    }
  }
);

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
