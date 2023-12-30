import { indexOf } from "@amcharts/amcharts5/.internal/core/util/Array.js"
import Country from "../classes/country"
import Item from "../classes/item"
import * as am5 from "@amcharts/amcharts5";
import State from "../classes/state"
import CountryAmData from "../classes/country";

export default class VM {
    constructor(view, model) {
        this.view = view
        this.model = model
        this.filter = undefined
        this.trackSelection = this.pickRandomTracks
        this.numberSelection = 1
        this.mapState = new State({ countries: [] })
        this.countries = this.mapState.state.countries
        this.searchState = new State({ results: [] })
        this.searchResults = this.searchState.state.results
    }

    setUrl(token) {
        this.model.setDeezerToken(token)
    }

    pickRandomEntry(arr) {
        return Math.round(Math.random() * (arr.length - 1))
    }

    setActiveCountries(filter) {
        if (filter) {
            this.countries = filter
        } else {
            const unfilteredCountries = this.model.tracks.map(track => {
                if (track.country_id) { return { id: track.country_id } }
            })

            this.countries = unfilteredCountries.filter((country, index, self) =>
                index === self.findIndex((t) => (
                    t.id === country.id
                ))
            )
        }
        this.mapState.createEffect(() => {
            const amData = []
            this.countries.forEach((country) => {
                const tracks = this.trackSelection(this.numberSelection, country.id)
                amData.push(new CountryAmData({ id: country.id, tracks: tracks }))
            })
            this.view.renderMap(amData)
        })
    }

    pickRandomTracks(numberOfTracks, country) {
        const allTracks = this.model.tracks.filter(track => track.country_id == country)
        const randomTracks = []
        for (let i = 0; i < numberOfTracks; i++) {
            const rand = this.pickRandomEntry(allTracks)
            if (allTracks[rand] && (randomTracks.includes(allTracks[rand]) == false)) {
                randomTracks.push(allTracks[rand])
            }
        }
        return randomTracks
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
