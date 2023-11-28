
import CountryAmData from "../classes/country";
import Loader from '../components/loader'
import AmMap from "../classes/AmCharts";
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
        this.countriesAmData = countries.map(country => {
            return new CountryAmData(country)
        })
        this.amMap.setCountriesData(this.countriesAmData)
    }

    setVM(VM) {
        this.VM = VM
    }
}


export default View