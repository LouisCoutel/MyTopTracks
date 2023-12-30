
import CountryAmData from "../classes/country";
import Loader from '../components/loader'
import AmMap from "../classes/AmCharts";
import { object } from "@amcharts/amcharts5";
import State from "../classes/state";
class View {
    constructor() {
        this.amMap = new AmMap()
        this.amMap.buildSequence()
        this.loader = new Loader()
        this.loader.loaderElement.ontransitionend = () => {
            this.loader.removeSelf()
            console.log("loader removed")
        }
        this.loader.insertSelf()

    }

    renderMap(countries) {
        console.log(countries)
        this.amMap.setCountriesData(countries)
    }

    renderSearchResults(results) {
    }

    setVM(VM) {
        this.VM = VM
    }
}


export default View