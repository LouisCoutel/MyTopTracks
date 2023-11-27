import * as am5 from "@amcharts/amcharts5";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_worldOutlineHigh from "@amcharts/amcharts5-geodata/worldOutlineLow"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5map from "@amcharts/amcharts5/map";
class View {
    constructor() {
        this.root = am5.Root.new("chartdiv");

        this.root.setThemes([
            am5themes_Responsive.new(this.root)
        ]);

        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                projection: am5map.geoMercator(),
                panX: "rotateX",
                panY: "none",
                wheelY: "zoom",
                minZoomLevel: 0.7,
                maxZoomLevel: 2,
            })
        );



        this.outline = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldOutlineHigh,
            })
        );

        this.renderOutline()


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
        this.tooltip = am5.Tooltip.new(this.root, {});
    }



    renderOutline() {
        this.outline.mapPolygons.template.setAll({
            shadowColor: am5.color(0x000000),
            shadowBlur: 10,
            shadowOffsetY: 4,
            shadowOffsetX: 0,
            shadowOpacity: 0.4,
        });
    }


    render(countries) {
        console.log(countries)
        const countryData = countries.map(country => {
            const tooltipStrings = country.tracks.map(track => track.artist + " - " + track.title).join(' // ')
            return {
                id: country.id, enabledSettings: {
                    fill: am5.color(0xfefefa),
                    stroke: am5.color(0xe1e1e1),
                    interactive: true,
                    tooltipText: tooltipStrings
                }
            }
        })
        console.log(this.countriesSeries)
        this.countriesSeries.mapPolygons.template.setAll({ templateField: "enabledSettings" })
        this.countriesSeries.data.setAll(countryData)

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