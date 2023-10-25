import Card from "./classes/card.js"
import Selector from "./classes/selector.js"

class View {
    setController(controller) {
        this.controller = controller
        this.selectorsList = document.getElementById("selectors-list")
    }
    buildCard(country) {
        country.card = new Card(country)
    }

    buildSelectors(countries) {
        countries.map(country => {
            country.selector = new Selector(country.id)
            return country
        })
    }

    insertCard(country) {
        console.log(country)
       document.body.appendChild(country.card.chartCard)
        country.HTMLelement.onmouseover = () => {
            country.card.chartCard.classList.toggle("displayed")
        }
        country.HTMLelement.onmouseleave = () => {
            country.card.chartCard.classList.toggle("displayed")
        }
    }

    selectEvents(countries) {
        countries.forEach(async country => {
            country.selector.switch.onchange = async () => {
                this.controller.setSelected(country);
                await this.controller.fetchSelected(country);
                this.controller.showSelected(country);
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