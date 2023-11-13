import DeezerAPIHandler from "./provider.js"
import countriesAndContinents from "./countryContinents.js";

class Model {
  #continents = [{ name: 'Africa' }, { name: 'Asia' }, { name: 'Europe' }, { name: 'Australia' }, { name: 'North America' }, { name: 'South America' }]
  #availableCountries
  constructor() {
    this.handler = new DeezerAPIHandler
    this.countriesAndContinents = countriesAndContinents
  }
  setController(controller) {
    this.controller = controller
  }
  async init() {
    this.#availableCountries = await this.handler.getChartList();
    console.log(this.#availableCountries)
  }

  async getCountryChart(country) {
    const matchingCountry = this.#availableCountries.find(element => element.id == country.id)
    if (matchingCountry.chart == undefined) {
      matchingCountry.chart = await this.handler.getCountryChart(matchingCountry.listid, 1)
      return matchingCountry.chart
    } else {
      return matchingCountry.chart
    }
  }

  getContinent(id) {
    return this.countriesAndContinents[id].continent
  }
  get continents() {
    return this.#continents
  }

  get availableCountries() {
    return this.#availableCountries
  }

}

export default Model