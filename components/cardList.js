import Card from "./card"

class CardList {
    constructor(country) {
        this.listElement = document.createElement("div")
        this.listElement.setAttribute("class", "card-list")
        this.listElement.id = "list-" + country.id
        this.cards = country.tracks.map(track => {
            return new Card(track)
        })
        this.cards.forEach(card => { this.listElement.appendChild(card.cardElement) })
    }


}

export default CardList