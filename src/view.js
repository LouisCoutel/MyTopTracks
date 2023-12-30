
import CountryAmData from "../classes/country";
import Loader from '../components/loader'
import AmMap from "../classes/AmCharts";
import { object } from "@amcharts/amcharts5";
import State from "../classes/state";
import deezerHandler from "../providers/DeezerAPIHandler";

class View {
    constructor() {
        this.amMap = new AmMap()
        this.amMap.buildSequence()

        this.loader = new Loader()
        this.loader.loaderElement.ontransitionend = () => {
            this.loader.removeSelf()
            console.log("loader removed")
            this.amMap.countryModal.events.on("opened", (ev) => {
                const queryField = document.getElementById("query-field")
                queryField.value = ""
                const searchButton = document.getElementById("search-button")
                searchButton.onclick = (ev) => { this.handleSearch(ev) }
            });
        }
        this.loader.insertSelf()
    }

    handleSearch = async () => {
        const queryField = document.getElementById("query-field")
        this.VM.searchResults = await deezerHandler.search(queryField.value)
        this.VM.searchState.createEffect(() => {
            console.log("render !")
            this.renderSearch(this.VM.searchResults)
        })
    }

    renderMap(countries) {
        this.amMap.setCountriesData(countries)
    }

    renderSearch(results) {
        const resultsDiv = document.getElementById("results-div")
        console.log(resultsDiv)
        if (resultsDiv) {
            const resultsHTML = results.map(result => {
                console.log(result)
                return `<article style="display: flex; gap: 8px; align-items: center;">
                <img src="${result.album.cover}" style="width: 40px; border: 1 px solid black; border-radius: 4px;" alt="album cover" loading="lazy"/><p style="flex-grow: 1;">${result.title}</p><button onclick="" style="padding: 2px 4px; height: fit-content;">select</button></article>`
            })
            resultsDiv.innerHTML = resultsHTML.join("")
        }
    }

    setVM(VM) {
        this.VM = VM
    }
}


export default View