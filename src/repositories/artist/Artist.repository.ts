import { EntityRepository, Repository } from "typeorm"
import { Artist } from "../../entity/Artist"
import { ArtistDao } from "./Artist.repository.types"

@EntityRepository(Artist)
class ArtistRepository extends Repository<Artist> {
  add(artist: ArtistDao) {
    return this.insert(artist)
  }
}

export default ArtistRepository
