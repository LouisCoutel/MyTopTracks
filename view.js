import Card from "./classes/card.js"
import Selector from "./classes/selector.js"

class View {
    setController(controller) {
        this.controller = controller
        this.selectorsList = document.getElementById("selectors-list")
        this.hideButton = document.getElementById("hide-button")
        this.hideButton.onClick = () => {
            this.hideSelectors()
        }
    }
    buildCard(country) {
        country.card = new Card(country)
    }

    buildSelectors(continents) {
        continents.map(continent => {
            continent.selector = new Selector(continent.name)
            return continent
        })
    }

    hideSelectors() {
        this.selectorsList.forEach(el => el.classList.toggle("hidden"))
    }

    insertCard(country) {
        console.log(country)
        document.body.appendChild(country.card.chartCard)
        country.element.onmouseover = () => {
            country.card.chartCard.classList.toggle("displayed")
        }
        country.element.onmouseleave = () => {
            country.card.chartCard.classList.toggle("displayed")
        }
    }

    async eventsLoop(index, countries, continent) {
        if (index < countries.length) {
            if (countries[index].continent == continent.name) {
                this.controller.setSelected(countries[index]);
                await this.controller.fetchSelected(countries[index])
                this.controller.enableSelected(countries[index]);
                index++
                this.eventsLoop(index, countries, continent)
            } else {
                this.controller.setHidden(countries[index])
                index++
                this.eventsLoop(index, countries, continent)
            }
        }
    }

    selectEvents(continents, countries) {
        continents.forEach(continent => {
            continent.selector.switch.onchange = () => {
                this.eventsLoop(0, countries, continent)
                this.controller.hideOtherContinents()
            }
        })
    }





    insertSelectors(continents) {
        continents.forEach(continent => {
            this.selectorsList.appendChild(continent.selector.element)
        })
    }
}


export default View