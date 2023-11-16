import CardList from "./cardList"

class Country {
  constructor(code) {
    this.id = code
    // this.continent = this.findContinent(code)
    this.itemIds = []
    this.svgElement = document.getElementById(code)
    this.position = this.svgElement.getBoundingClientRect()
    this.cardList = new CardList(code)
    this.toggleClass()
    this.setEvents()
  }
  toggleClass() {
    this.svgElement.classList.toggle('land');
    this.svgElement.classList.toggle('pays-actifs');
  }
  appendCard(card) {
    this.cardList.appendCard(card)
  }

  setEvents() {
    this.svgElement.onmouseenter = () => {
      console.log("on")
      this.cardList.toggle()
    }
    this.svgElement.onmouseleave = () => {
      console.log("off")
      this.cardList.toggle()
    }
  }
}

export default Country