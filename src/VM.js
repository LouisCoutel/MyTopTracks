import { indexOf } from "@amcharts/amcharts5/.internal/core/util/Array.js"
import Country from "../classes/country"
import Item from "../classes/item"
import * as amMap from "./map.js"
import * as am5 from "@amcharts/amcharts5";

export default class VM {
    constructor(view, model) {
        this.view = view
        this.model = model
        this.countries = []
        this.items = []
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

        if (this.countries == undefined || !this.countries.some(country => country.id == item.countryId)) {
            this.countries.push({
                id: item.countryId, enabledSettings: {
                    fill: am5.color(0xfefefa),
                    stroke: am5.color(0xe1e1e1),
                    interactive: true,
                    tooltipText: `${item.title}`,
                    items: [item]
                }
            })
        } else {
            const currentCountry = this.countries.find(country => country.id == item.countryId)
            currentCountry.enabledSettings.items.push(item)
        }
        this.view.render(this.countries)
    }


    checkCountry(code) {
        return this.countries.some(country => country.id == code)
    }

    matchCountry(code) {
        return this.countries.find(country => country.id == code)
    }


}
