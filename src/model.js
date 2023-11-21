import deezerHandler from "../providers/DeezerAPIHandler.js"
import mBrainzHandler from "../providers/MBrainzAPIHandler.js";
import countriesAndContinents from '../data/csc.json' assert { type: 'json' }

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
      const trackData = await this.mBrainz.searchArtist(track)
      console.log(await trackData)


      if (await trackData.country != undefined) {
        track.country = { name: trackData.area.name, code: trackData.country, city: "" }
      } else if (await trackData.area.type == "City") {
        const country = this.countriesAndContinents.find(country => country.cities.includes(trackData.area.name))
        track.country = { name: country.name, code: country.code, city: trackData.area.name }
      } else {
        track.country = { name: "France", code: "FR", city: "" }
      }

      console.log(await track.country)
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