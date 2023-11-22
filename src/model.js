import deezerHandler from "../providers/DeezerAPIHandler.js"
import mBrainzHandler from "../providers/MBrainzAPIHandler.js";
import countriesAndContinents from '../data/csc.json' assert { type: 'json' }

class Model {
  #continents = [{ name: 'Africa' }, { name: 'Asia' }, { name: 'Europe' }, { name: 'Australia' }, { name: 'North America' }, { name: 'South America' }]
  constructor() {
    // this.countriesData = am5geodata_data_countries
    // this.countriesData2 = am5geodata_data_countries2
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
        track.country = { name: trackData.area.name, code: trackData.country, location: "" }
      } else if (await trackData.area.type) {
        track.country = this.findCountry(trackData)
      } else {
        track.country = { name: "France", code: "FR", location: "" }
      }

      console.log(await track.country)
      await this.VM.setItem(track, this.tracks.indexOf(track))
    }
  }

  findCountry(trackData) {
    let country = this.countriesAndContinents.find(country => country.cities.includes(trackData.area.name))

    if (country) {
      return { name: country.name, code: country.code, location: trackData.area.name }
    } else if (trackData.disambiguation.includes("US")) {
      return { name: "United States", code: "US", location: trackData.area.name }
    } else if (trackData.disambiguation.includes("UK")) {
      return { name: "United Kingdom", code: "UK", location: trackData.area.name }
    } else {
      country = this.countriesAndContinents.find(country => country.states.includes(trackData.area.name))
      if (country) {
        return { name: country.name, code: country.code, location: trackData.area.name }
      }
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