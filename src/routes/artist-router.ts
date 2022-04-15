import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { PlayedSongHistory } from "../entity/PlayedSongHistory";
import { Router } from "express";
import DateService from "../tools/DateService";
import { responseDto } from "../tools/helper-functions";
import { Song } from "../entity/Song";
import { AddSongDto } from "../models/dtos/song-dtos";
import { AddArtistDto } from "../models/dtos/artist-dtos";
import { Artist } from "../entity/Artist";

const router = Router();

router.post(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const artistBody: AddArtistDto = request.body;

      const artist: Artist = {
        ...artistBody,
      };
      await getRepository(Artist).insert(artist);
      response.status(201).send(responseDto({ data: true }));
    } catch (error) {
      response.status(400).send(responseDto({ error }));
    }
  }
);

export default router;
