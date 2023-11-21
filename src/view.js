import CardList from "../components/cardList.js"

class View {
    setVM(VM) {
        this.VM = VM
    }

    appendCardList(country) {
        country.toggleClass()
        document.body.appendChild(country.cardList.listElement)
        this.setEvents(country)
    }

    appendCard(country, item) {
        country.cardList.listElement.appendChild(item.card.cardElement)
    }

    render(country, item) {
        country.appendCard(item.card.cardElement)
    }
}


export default View