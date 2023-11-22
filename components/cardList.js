class CardList {
    constructor(country) {
        this.listElement = document.createElement("div")
        this.listElement.setAttribute("class", "card-list")
        this.listElement.id = "list-" + country.id
        this.listElement.setAttribute("style", `top: 100vh; left: 50vw;`)
        this.appendSelf()
    }
    toggle() {
        this.listElement.classList.toggle("displayed")
    }
    appendSelf() {
        document.body.appendChild(this.listElement)
    }
    appendCard(card) {
        this.listElement.appendChild(card)
    }
    setPos(x) {
        this.listElement.setAttribute("style", `top: 25%; left: ${x}px;`)
    }
}

export default CardList