import { Category } from "../../entity/core/enums"

export type PlayedSongHistoryDto = {
  id: number
  playedTime: Date
  song: {
    id: number
    title: string
    categories: Category[]
  }
}

export type PlayedSongHistoryDao = {
  song: number
  user: number
}
