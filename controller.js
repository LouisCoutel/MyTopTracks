export default class Controller {
    constructor(view, model) {
        this.view = view
        this.model = model
    }

    async fetchAvailable() {
        await this.model.getAvailableCountries();
    }

    async fetchCharts() {
        await this.model.getCountriesCharts();
    }
    async render(country) {
        this.view.buildCards(country)
        this.view.insertCards(country)
    }
    async setAvailable() {
        await this.fetchAvailable()
        this.countries = this.model.availableCountries.map(country => {
            country.display = false;
            country.HTMLelement = document.getElementById(country.id)
            return country
        })
        await this.view.buildSelectors(this.countries)
        this.showAvailable()
    }

    setSelected(country) {
        country.display = true;
    }

    async fetchSelected(country) {
        let chart = await this.model.getCountryChart(country)
        console.log(chart)
        country.track = await chart[0].title
        country.artist = await chart[0].subtitle
        country.images = await chart[0].images
    }

    showSelected(country) {
        country.HTMLelement.classList.toggle("land")
        country.HTMLelement.classList.toggle("pays-actifs")
        this.view.buildCard(country);
        this.view.insertCard(country)
    }
    showAvailable() {
        this.view.insertSelectors(this.countries)
        this.view.selectEvents(this.countries)
    }

}
