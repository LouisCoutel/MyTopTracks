import deezerHandler from "../providers/DeezerAPIHandler.js"
import supabase from "../providers/supabaseClient.js"
import state from "../classes/state.js"
import Observable from "../classes/Observable.js"

class Model extends Observable {
  constructor() {
    super()
    this.tracks = []
    this.searchResults = []
  }

  setVM(VM) {
    this.VM = VM
  }

  async getAllTracks() {
    this.tracks = await supabase.getAll()
    this.notify(this)
  }
}

export default Model