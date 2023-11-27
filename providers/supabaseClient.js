import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wgiknyshjwcesabvilut.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaWtueXNoandjZXNhYnZpbHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MjM1MzgsImV4cCI6MjAxNjM5OTUzOH0.QTH4tVz3Agj-sJMHzG84n9yl03VqlGrE2LSPFsFWQn4'


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

    async getArtistsCountryId() {
        const { data, error } = await this.supabase.from('artists').select("country_id").neq("country_id", null)
        if (error) {
            console.log(error)
        }
        return data
    }

    async getAll() {
        const { data, error } = await this.supabase.rpc('get_all')
        if (error) {
            console.log(error)
        }
        return data
    }
}

const supabase = new SupabaseClient()
export default supabase