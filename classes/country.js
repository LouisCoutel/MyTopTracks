import CardList from "../components/cardList"

class Country {
  constructor(code) {
    this.id = code
    // this.continent = this.findContinent(code)
    this.itemIds = []
    this.svgElement = document.getElementById(code)
    this.position = this.svgElement.getBoundingClientRect()
    this.cardList = new CardList(this)
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
    this.svgElement.onmouseenter = (e) => {
      this.cardList.toggle()
      console.log(e.clientX)
      console.log(window.innerWidth)
      if (e.clientX < (window.innerWidth - 250)) {
        this.cardList.setPos(e.clientX + 40)
      } else {
        this.cardList.setPos(e.clientX - 100)
      }
    }
    this.svgElement.onmouseleave = () => {
      this.cardList.toggle()
    }
  }
}

export default Country