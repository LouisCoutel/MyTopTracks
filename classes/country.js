import CardList from "../components/cardList"
import * as am5 from "@amcharts/amcharts5";
class CountryAmData {
  constructor(country) {
    this.cardList = new CardList(country)
    this.id = country.id
    this.enabledSettings = {
      fill: am5.color(0xfefefa),
      stroke: am5.color(0xe1e1e1),
      interactive: true,
      tooltipHTML: this.cardList.listElement.outerHTML
    }
  }
}

export default CountryAmData