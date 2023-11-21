import Country from "../classes/country"
import Item from "../classes/item"
export default class VM {
    countries = []
    #continents
    items = []
    constructor(view, model) {
        this.view = view
        this.model = model
    }


    setUrl(token) {
        this.model.setDeezerToken(token)
    }

    setItem(item, index) {
        const newItem = new Item(item, index)
        this.items.splice(index, 1, newItem)
        this.setCountry(newItem)
    }

    setCountry(item) {
        const code = item.countryId
        console.log(item.countryId)

        if (!this.checkCountry(code)) {
            console.log(this.checkCountry(code))
            this.countries.push(new Country(code)
            )
        }

        const currentCountry = this.countries.find(country => country.id == code)
        this.linkItemToCountry(currentCountry, item)
        if (currentCountry.itemIds.length <= 5) { this.view.render(currentCountry, item) }
    }

    linkItemToCountry(country, item) {
        country.itemIds.push(item.id)
    }

    checkCountry(code) {
        return this.countries.some(country => country.id == code)
    }

    matchCountry(code) {
        return this.countries.find(country => country.id == code)
    }


}
