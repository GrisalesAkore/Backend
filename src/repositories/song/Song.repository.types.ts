import { Category } from "../../entity/core/enums"
import { ArtistDao } from "../artist/Artist.repository.types"

export type SongDto = {
  id: number
  title: string
  content: string
  categories: Category[]
  artist: {
    id: number
  }
}

export type SongDao = {
  title: string
  content: string
  categories: Category[]
  artist: ArtistDao
}

export type EditSongDao = {
  title?: string
  content?: string
  categories?: Category[]
  artist?: number
}
