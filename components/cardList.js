class CardList {
    constructor(country) {
        this.listElement = document.createElement("div")
        this.listElement.setAttribute("class", "card-list")
        this.listElement.id = "list-" + country.id
    }
    appendCard(card) {
        this.listElement.appendChild(card.cardElement)
    }
}

export default CardList