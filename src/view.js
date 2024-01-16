
import CountryAmData from "../classes/country";
import Loader from '../components/loader'
import AmMap from "../classes/AmCharts";
import { object } from "@amcharts/amcharts5";
import state from "../classes/state";
import deezerHandler from "../providers/DeezerAPIHandler";
import supabaseClient from "../providers/supabaseClient";
import SearchResult from "../components/SearchResult";
class View {
    constructor(VM) {
        this.VM = VM
        this.amMap = new AmMap(this)
        this.amMap.buildSequence()
        this.loader = new Loader()
        this.loader.loaderElement.ontransitionend = () => {
            this.loader.removeSelf()
            this.amMap.countryModal.events.on("opened", (ev) => {
                const queryField = document.getElementById("query-field")
                const searchButton = document.getElementById("search-button")
                queryField.oninput = () => {
                    this.VM.getSearchResults(queryField.value)
                }
            });
        }
        this.loader.insertSelf(document.body)
        this.VM.addObserver(this)
        this.currentCountry = state.create({ element: undefined })
        this.resultsElement = []
    }

    update(data) {
        this.renderMap(data.amData)
        this.renderSearch(data.searchResults)
    }

    setModalHeading() {
        const modalHeading = document.getElementById("modal-heading")
        modalHeading.innerHTML = `Suggest me a track from ${this.currentCountry.name}!`
    }

    renderMap(countries) {
        this.amMap.setCountriesData(countries)
    }

    renderSearch = (results) => {
        const resultsDiv = document.getElementById("results-div")
        if (resultsDiv) {
            while (resultsDiv.firstChild) {
                resultsDiv.removeChild(resultsDiv.firstChild);
            }
            results?.forEach(result => {
                const sr = new SearchResult(result, this.VM, this.currentCountry)
                resultsDiv.appendChild(sr.element)
            })
        }
    }

    handleSelectClick = (result) => {
        this.VM.addSuggested(result, this.currentCountry.id)
    }
}


export default View