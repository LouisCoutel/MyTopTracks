import { indexOf } from "@amcharts/amcharts5/.internal/core/util/Array.js"
import Country from "../classes/country"
import Item from "../classes/item"
import * as am5 from "@amcharts/amcharts5";

export default class VM {
    tracks
    constructor(view, model) {
        this.view = view
        this.model = model
        this.activeCountries = []
        this.tracks = []
    }


    setUrl(token) {
        this.model.setDeezerToken(token)
    }

    pickRandomEntry(arr) {
        return Math.round(Math.random() * (arr.length - 1))
    }

    async setActiveCountries(filter) {

        if (filter) {
            this.activeCountries = this.model.filter(country => filter.includes(country.id))
        } else {
            this.activeCountries = this.model.availableCountries
        }
    }

    async setRandomTracksByCountry(numberOfTracks) {
        this.activeCountries = this.activeCountries.map(country => {
            const allTracks = this.model.tracks.filter(track => track.country_id == country.id)
            const randomTracks = []
            for (let i = 0; i < numberOfTracks; i++) {
                const rand = this.pickRandomEntry(allTracks)
                if (allTracks[rand] && (randomTracks.includes(allTracks[rand]) == false)) {
                    randomTracks.push(allTracks[rand])
                }
            }
            country.tracks = randomTracks
            this.tracks.push(randomTracks)
            return country
        })

    }

    async setCountryAmChartsSetting() {
        this.view.render(this.activeCountries)
        console.log(this.activeCountries)
    }


    checkCountry(code) {
        return this.countries.some(country => country.id == code)
    }

    matchCountry(code) {
        return this.countries.find(country => country.id == code)
    }


}
