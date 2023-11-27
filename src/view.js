import * as am5 from "@amcharts/amcharts5";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldHigh";
import am5geodata_worldOutlineHigh from "@amcharts/amcharts5-geodata/worldOutlineHigh"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5map from "@amcharts/amcharts5/map";

import CardList from '../components/cardList'
import Card from '../components/card'
import Loader from '../components/loader'
class View {
    constructor() {
        this.loader = new Loader()
        this.loader.loaderElement.ontransitionend = () => {
            this.loader.removeSelf()
            console.log("loader removed")
        }

        this.root = am5.Root.new("chartdiv")
        this.root.setThemes([
            am5themes_Animated.new(this.root),
            am5themes_Responsive.new(this.root)
        ]);

        this.loader.insertSelf()
        this.setChart()
        this.setOutlineSeries()
        this.setCountriesSeries()
        this.setTooltip()
    }

    setChart() {
        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                projection: am5map.geoMercator(),
                panX: "translateX",
                panY: "translateY",
                minZoomLevel: 0.9,
                maxZoomLevel: 3,
                zoomLevel: 0.9,
                rotationX: -10,
                wheelSensitivity: 0.7,
                wheel: "zoomX",
                maxPanOut: 0.07,
                paddingLeftLeft: "20px",
            })
        );
    }

    setOutlineSeries() {
        this.outline = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldOutlineHigh,
            })
        );

        this.outline.mapPolygons.template.setAll({
            shadowColor: am5.color(0x000000),
            shadowBlur: 10,
            shadowOffsetY: 4,
            shadowOffsetX: 0,
            shadowOpacity: 0.4,
        });
    }

    setCountriesSeries() {
        this.countriesSeries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldHigh,
                exclude: ["AQ"],
                fill: am5.color(0xedeae0),
            })
        )

        this.countriesSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0xffe500)
        });
    }





    setTooltip() {
        this.tooltip = am5.Tooltip.new(this.root, {
            getFillFromSprite: false,
            labelText: '{"id"}',
        });

        this.tooltip.get("background").setAll({
            strokeOpacity: 0,
        });

        this.countriesSeries.set("tooltip", this.tooltip)

    }

    render(countries) {
        const countriesAmData = countries.map(country => {
            const cardList = new CardList(country)
            country.tracks.forEach(track => {
                cardList.appendCard(new Card(track))
            })
            return {
                id: country.id, enabledSettings: {
                    fill: am5.color(0xfefefa),
                    stroke: am5.color(0xe1e1e1),
                    interactive: true,
                    tooltipHTML: cardList.listElement.outerHTML,
                }
            }
        })
        console.log(this.tooltip)
        this.countriesSeries.mapPolygons.template.setAll({ templateField: "enabledSettings" })
        this.countriesSeries.data.setAll(countriesAmData)
    }

    setVM(VM) {
        this.VM = VM
    }

    appendCardList(country) {
        this.setEvents(country)
    }

    appendCard(country, item) {
        country.cardList.listElement.appendChild(item.card.cardElement)
    }
}


export default View