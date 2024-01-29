import supabase from "../clients/SupabaseClient.js"
import Observable from "../utils/Observable.js"

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
