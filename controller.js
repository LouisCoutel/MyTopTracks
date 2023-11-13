export default class Controller {
    #countries
    #continents
    constructor(view, model) {
        this.view = view
        this.model = model
        this
    }

    async render(country) {
        this.view.buildCards(country)
        this.view.insertCards(country)
    }
    async setAvailable() {
        await this.model.init()
        this.#continents = this.model.continents
        this.#countries = this.model.availableCountries.map(country => {
            let newCountry = {
                name: country.name,
                id: country.id,
                display: false,
                continent: this.model.getContinent(country.id),
                element: document.getElementById(country.id)
            }
            console.log(newCountry)
            return newCountry
        })
        await this.view.buildSelectors(this.continents)
        this.showAvailable()
    }
    showAvailable() {
        this.view.insertSelectors(this.#continents)
        this.view.selectEvents(this.#continents, this.#countries)
    }

    setSelected(country) {
        country.display = true;
    }

    setHidden(country) {
        country.hidden = true
    }

    enableSelected(countryToEnable) {
        countryToEnable.element.classList.toggle("land")
        countryToEnable.element.classList.toggle("pays-actifs")
        this.view.buildCard(countryToEnable);
        this.view.insertCard(countryToEnable)
    }

    hideOtherContinents() {
        this.countries.forEach(countryToHide => {
            if (countryToHide.hidden == true) {
                countryToHide.element.classList.add(".hidden")
            }
        })
    }


    async fetchSelected(selectedCountry) {
        let chart = await this.model.getCountryChart(selectedCountry)
        selectedCountry.track = await chart[0].title
        selectedCountry.artist = await chart[0].subtitle
        selectedCountry.images = await chart[0].images
    }





    get countries() {
        return this.#countries
    }
    get continents() {
        return this.#continents
    }
    set countries(value) {
        this.#countries = value
    }

    set continents(value) {
        this.#continents = value
    }

}
