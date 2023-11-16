import deezerHandler from "./providers/DeezerAPIHandler.js"
import mBrainzHandler from "./providers/MBrainzAPIHandler.js";
import countriesAndContinents from "./countryContinents.js";
class Model {
  #continents = [{ name: 'Africa' }, { name: 'Asia' }, { name: 'Europe' }, { name: 'Australia' }, { name: 'North America' }, { name: 'South America' }]
  constructor() {
    this.deezer = deezerHandler
    this.mBrainz = mBrainzHandler
    this.countriesAndContinents = countriesAndContinents
  }
  setVM(VM) {
    this.VM = VM
  }

  setDeezerToken(token) {
    this.deezer.token = token
  }

  async getTopTracks() {
    this.tracks = await this.deezer.getTopTracks()
    for (let track of await this.tracks) {
      const timeout = () => {
        return new Promise(function (resolve) {
          setTimeout(resolve, 1400)
        })
      }
      await timeout()
      track.country = await this.mBrainz.searchArtist(track)
      await this.VM.setItem(track, this.tracks.indexOf(track))
    }
  }


  getContinent(id) {
    return this.countriesAndContinents[id].continent
  }
  get continents() {
    return this.#continents
  }

}

export default Model