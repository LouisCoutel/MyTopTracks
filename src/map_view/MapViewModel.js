import CountryAmData from "../classes/country"
import Observable from "../classes/Observable"
import deezerHandler from "../clients/DeezerAPIHandler"
import { AlbumData, ArtistData, TrackData } from "../classes/Data"
import supabase from "../clients/supabaseClient"

export default class VM extends Observable {
    constructor(model) {
        super()
        this.model = model
        this.filter = undefined
        this.trackSelection = this.showSuggested
        this.numberSelection = 1
        this.amData
        this.searchResults
        this.model.addObserver(this)
    }

    async getSearchResults(query) {
        const results = await deezerHandler.search(query)

        this.searchResults = results
        this.notify(this)
    }

    update(data) {
        this.amData = this.setAmData(data.tracks)
        this.notify(this)
    }

    setUrl(token) {
        this.model.setDeezerToken(token)
    }

    pickRandomEntry(arr) {
        return Math.round(Math.random() * (arr.length - 1))
    }

    getCountries(tracks) {
        const unfilteredCountries = tracks.map((track) => {
            if (track.country_id) {
                return { id: track.country_id }
            }
        })

        return unfilteredCountries.filter(
            (country, index, self) => index === self.findIndex((t) => t.id === country.id)
        )
    }

    setAmData(tracks) {
        const activeCountries = this.getCountries(tracks)
        const data = []

        activeCountries.forEach((country) => {
            const tracks = this.trackSelection(this.numberSelection, country.id)
            if (tracks[0]) {
                data.push(new CountryAmData({ id: country.id, tracks: tracks }))
            }
        })

        return data
    }

    pickRandomTracks(numberOfTracks, country) {
        const allTracks = this.model.tracks?.filter((track) => track.country_id == country)
        const randomTracks = []

        for (let i = 0; i < numberOfTracks; i++) {
            const rand = this.pickRandomEntry(allTracks)

            if (allTracks?.[rand] && randomTracks?.includes(allTracks[rand]) == false) {
                randomTracks.push(allTracks[rand])
            }
        }

        return randomTracks
    }

    showSuggested(numberOfTracks, country) {
        return this.model.tracks?.filter((track) => track.country_id == country && track.is_suggested_track)
    }

    checkCountry(code) {
        return this.countries.some((country) => country.id == code)
    }

    matchCountry(code) {
        return this.countries.find((country) => country.id == code)
    }

    async addSuggested(track, country) {
        const isInDb = await supabase.get(track.id)

        if ((await isInDb) == undefined) {
            const albumDetails = await deezerHandler.getAlbumDetails(track.album.id)
            const genres = albumDetails.genres ? albumDetails.genres.data.map((genre) => genre.name) : null
            const trackData = new TrackData(track, false, true)
            const albumData = new AlbumData(track, genres)
            const artistData = new ArtistData(track, country)
            await supabase.insertSequence(artistData, albumData, trackData)
            await this.model.getAllTracks()
        }
    }
}
