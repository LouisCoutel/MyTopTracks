import { indexOf } from "@amcharts/amcharts5/.internal/core/util/Array.js"
import Country from "../classes/country"
import Item from "../classes/item"
import * as am5 from "@amcharts/amcharts5";
import { createState, createEffect } from "../classes/state"
import CountryAmData from "../classes/country";
export default class VM {
    constructor(view, model) {
        this.view = view
        this.model = model
        this.countries = createState([])
        this.tracks = createState([])
        createEffect(() => {
            console.log("countries", this.countries)
        })
    }

    setUrl(token) {
        this.model.setDeezerToken(token)
    }

    pickRandomEntry(arr) {
        return Math.round(Math.random() * (arr.length - 1))
    }

    async setActiveCountries() {
        const unfilteredCountries = this.model.tracks.map(track => {
            if (track.country_id) { return { id: track.country_id } }
        })

        const filteredCountries = unfilteredCountries.filter((country, index, self) =>
            index === self.findIndex((t) => (
                t.id === country.id
            ))
        )

        filteredCountries.forEach((country, index) => {
            this.countries[index] = createState(country)
        })
    }

    async setRandomTracksByCountry(numberOfTracks) {
        this.countries.forEach(country => {
            const allTracks = this.model.tracks.filter(track => track.country_id == country.id)
            const randomTracks = []

            for (let i = 0; i < numberOfTracks; i++) {
                const rand = this.pickRandomEntry(allTracks)
                if (allTracks[rand] && (randomTracks.includes(allTracks[rand]) == false)) {
                    randomTracks.push(allTracks[rand])
                }
            }
            country.tracks = randomTracks
        })
        createEffect(() => {
            this.view.render(this.countries)
        })
    }


    // async setCountryAmChartsSetting() {
    //     this.view.render(this.activeCountries)
    //     console.log(this.activeCountries)
    // }


    checkCountry(code) {
        return this.countries.some(country => country.id == code)
    }

    matchCountry(code) {
        return this.countries.find(country => country.id == code)
    }


}
