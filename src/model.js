import deezerHandler from "../providers/DeezerAPIHandler.js"
import supabase from "../providers/supabaseClient.js"
class Model {
  constructor() {
  }
  setVM(VM) {
    this.VM = VM
  }

  setDeezerToken(token) {
    this.deezer.token = token
  }
  async getAllTracks() {
    this.tracks = await supabase.getAll()
  }

  async getCountries() {
    let unfilteredCountries = await supabase.getArtistsCountryId()
    unfilteredCountries = unfilteredCountries.map(country => {
      if (country.country_id) { return { id: country.country_id } }
    })


    this.availableCountries = unfilteredCountries.filter((country, index, self) =>
      index === self.findIndex((t) => (
        t.id === country.id
      ))
    )
  }
}

export default Model