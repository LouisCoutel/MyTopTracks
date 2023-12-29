
import CountryAmData from "../classes/country";
import Loader from '../components/loader'
import AmMap from "../classes/AmCharts";
import { object } from "@amcharts/amcharts5";
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

    render(countries) {
        const countriesAmData = []
        for (const key of Object.keys(countries)) {
            countriesAmData.push(new CountryAmData(countries[key]))
        }
        console.log(countriesAmData)
        this.amMap.setCountriesData(countriesAmData)
    }

    setVM(VM) {
        this.VM = VM
    }
}


export default View