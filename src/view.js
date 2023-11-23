import * as am5 from "@amcharts/amcharts5";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldHigh";
import am5geodata_worldOutlineHigh from "@amcharts/amcharts5-geodata/worldOutlineHigh"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5map from "@amcharts/amcharts5/map";
class View {
    countries
    constructor() {
        this.root = am5.Root.new("chartdiv");

        this.root.setThemes([
            am5themes_Animated.new(this.root)
        ]);

        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                projection: am5map.geoMercator(),
                panX: "rotateX",
                panY: "none",
                wheelY: "zoom",
                minZoomLevel: 0.8,
                maxZoomLevel: 4,
            })
        );

        this.outline = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldOutlineHigh,
            })
        );

        this.renderOutline()
        this.countries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldHigh,
                exclude: ["AQ"],
                fill: am5.color(0xedeae0),
            })
        )
        this.countries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0x677935)
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
        this.countries.data.setAll(countries
        );

        this.countries.mapPolygons.template.setAll({
            templateField: "enabledSettings"
        })
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