import deezerHandler from "../providers/DeezerAPIHandler.js"
import supabase from "../providers/supabaseClient.js"
class Model {
  constructor() {
    this.availableCountries = []
  }
  setVM(VM) {
    this.VM = VM
  }

  setDeezerToken(token) {
    this.deezer.token = token
  }
  async getAllTracks() {
    this.tracks = await supabase.getAll()
    console.log(this.tracks[0])
  }
}

export default Model