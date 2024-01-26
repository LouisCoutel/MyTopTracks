import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://wgiknyshjwcesabvilut.supabase.co"
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaWtueXNoandjZXNhYnZpbHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MjM1MzgsImV4cCI6MjAxNjM5OTUzOH0.QTH4tVz3Agj-sJMHzG84n9yl03VqlGrE2LSPFsFWQn4"

class SupabaseClient {
    constructor() {
        this.supabase = createClient(supabaseUrl, supabaseKey)
        this.tracks = this.getAll()
    }

    async get(table, cols) {
        const { data, error } = await this.supabase.from(table).select(cols)

        if (error) {
            console.log(error)
        }

        return data
    }

    async getTrack(id) {
        const { data, error } = await supabase.from("tracks").select().eq("deezer_id", id)

        if (error) {
            console.error(error)
        }

        if (data[0]) {
            return data[0]
        }
    }

    async getArtistsCountryId() {
        const { data, error } = await this.supabase.from("artists").select("country_id").neq("country_id", null)

        if (error) {
            console.log(error)
        }

        return data
    }

    async getAll() {
        const { data, error } = await this.supabase.rpc("get_all")

        if (error) {
            console.log(error)
        }

        return data
    }

    async insertArtist(artistData) {
        const { data, error } = await this.supabase.from("artists").upsert(artistData).select()

        if (error) {
            console.error(error)
        }

        return data
    }

    async insertAlbum(albumData) {
        const { data, error } = await this.supabase.from("albums").upsert(albumData).select()

        if (error) {
            console.error(error)
        }

        return data
    }

    async insertTrack(trackData) {
        const { data, error } = await this.supabase.from("tracks").upsert(trackData).select()

        if (error) {
            console.error(error)
        }

        return data
    }

    async insertSequence(artistData, albumData, trackData) {
        await this.insertArtist(artistData)
        await this.insertAlbum(albumData)
        await this.insertTrack(trackData)
    }
}

const supabase = new SupabaseClient()
export default supabase
