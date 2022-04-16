import { Category } from "../../entity/core/enums";

export type PlayedSongHistoryDto = {
  id: number;
  playedTime: Date;
  song: {
    id: number;
    categories: Category[];
  };
};
