import Card from "./classes/card.js"
import Selector from "./classes/selector.js"

class View {
    setController(controller) {
        this.controller = controller
        this.selectorsList = document.getElementById("selectors-list")
    }
    buildCards(countries) {

        countries.forEach(country => {
            if (country.display == true) {
                console.log(country)
                country.card = new Card(country.id, country.title, country.artist, country.images)
            }
        })
    }

    buildSelectors(countries) {
        countries.map(country => {
            country.selector = new Selector(country.id)
            return country
        })
    }

    insertCards(countries) {
        countries.forEach(country => {
            country.HTMLElement.appendChild(country.card)
        })
    }

    selectEvents(countries) {
        countries.forEach(country => {
            country.selector.switch.onchange = () => {
                country.display = true;
                this.controller.setSelected();
            }
        })
    }
    insertSelectors(countries) {
        countries.forEach(country => {
            this.selectorsList.appendChild(country.selector.element)
        })
    }
}

export default View