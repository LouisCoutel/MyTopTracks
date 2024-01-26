import supabase from "../clients/supabaseClient.js"
import Observable from "../data_classes/Observable.js"

class Model extends Observable {
    constructor() {
        super()
        this.tracks = []
        this.searchResults = []
    }

    async getAllTracks() {
        this.tracks = await supabase.getAll()
        this.notify(this)
    }
}

export default Model
