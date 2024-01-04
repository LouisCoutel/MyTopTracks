
import supabase from "./supabaseClient"
class DeezerAPIHandler {
  constructor() {
    this.options = {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-site'
      }
    }
  }

  setDeezerToken(token) {
    this.token = token
  }

  async search(query) {
    const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${query}`
    const res = await fetch(url, this.options);
    if (res.ok) {
      const data = await res.json()
      return data.data
    } else { throw new Error("error: ", res) }
  }

  async insertSequence(artistData, albumData, trackData) {
    await this.insertArtist(artistData)
    await this.insertAlbum(albumData)
    await this.insertTrack(trackData)
  }

  async addTrack(track, country) {
    const isInDb = await this.supabase.getTrack(track.id)
    if (await isInDb == undefined) {
      const albumDetails = await this.deezer.getAlbumDetails(track.album.id)
      const genres = albumDetails.genres ? albumDetails.genres.data.map(genre => genre.name) : null
      const trackData = new TrackData(track)
      const albumData = new AlbumData(track, genres)
      const artistData = new ArtistData(track, countryId)

      await supabase.insertSequence(artistData, albumData, trackData)
    }
  }
}

const deezerHandler = new DeezerAPIHandler()
export default deezerHandler

