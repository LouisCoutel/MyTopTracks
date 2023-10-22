import ShazamAPIHandler from "./provider.js"
import Country from "./classes/country.js"

class Model {

  constructor() {
    this.handler = new ShazamAPIHandler
  }
  setController(controller) {
    this.controller = controller
  }
  async getAvailableCountries() {
    // on récupère la liste des charts
    this.availableCountries = await this.handler.getChartList();
  }

  async getCountryChart(country) {
    return await this.handler.getCountryChart(country.listid, 1)
  }

  


}

export default Model