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
    render() {
        this.view.buildCards(this.countries)
        this.view.insertCards(this.countries)
    }
    async setAvailable() {
        await this.fetchAvailable()
        this.countries = this.model.availableCountries.map(country => {
            country.display = false;
            return country
        })
        await this.view.buildSelectors(this.countries)
        this.showAvailable()
    }

    async setSelected() {
        this.countries.forEach(async country => {
            if (country.display == true) {
                let chart = await this.model.getCountryChart(country)
                console.log(chart)
                country.track = chart[0].title
                country.artist = chart[0].subtitle
                country.images = chart[0].images
            }
        })
        this.render()
    }
    showAvailable() {
        this.view.insertSelectors(this.countries)
        this.view.selectEvents(this.countries)
    }

}
