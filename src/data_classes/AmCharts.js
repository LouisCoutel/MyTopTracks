import * as am5 from "@amcharts/amcharts5"
import * as am5map from "@amcharts/amcharts5/map"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
import state from "./State"

class AmMap {
    constructor(view) {
        this.root = am5.Root.new("chartdiv")
        this.view = view
    }

    async buildSequence() {
        this.root.setThemes([am5themes_Animated.new(this.root), am5themes_Responsive.new(this.root)])
        this.buildChart()

        const geoOutline = await this.getGeoOutline()
        this.outlineSeries = await this.buildOutlineSeries(geoOutline)

        const geoCountries = await this.getGeoCountries()
        this.countriesSeries = await this.buildCountriesSeries(geoCountries)

        this.setSearchModal()
        this.buildTooltip()
        this.countriesSeries.set("tooltip", this.tooltip)
        this.setOutlineSeries()
        this.countriesSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0xffe500),
        })
    }

    buildChart() {
        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                projection: am5map.geoMercator(),
                panX: "translateX",
                panY: "translateY",
                minZoomLevel: 0.9,
                maxZoomLevel: 5,
                zoomLevel: 0.9,
                rotationX: -10,
                wheelSensitivity: 0.7,
                wheel: "zoomX",
                maxPanOut: 0.07,
                paddingLeftLeft: "20px",
            })
        )
    }

    async getGeoOutline() {
        const worldOutlineLow = await import("@amcharts/amcharts5-geodata/worldOutlineLow")

        return worldOutlineLow.default
    }

    async buildOutlineSeries(geoData) {
        return this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: geoData,
            })
        )
    }

    setOutlineSeries() {
        this.outlineSeries.mapPolygons.template.setAll({
            shadowColor: am5.color(0x000000),
            shadowBlur: 10,
            shadowOffsetY: 4,
            shadowOffsetX: 0,
            shadowOpacity: 0.4,
        })
    }

    async getGeoCountries() {
        const am5geodata_worldLow = await import("@amcharts/amcharts5-geodata/worldLow")

        return am5geodata_worldLow.default
    }

    async buildCountriesSeries(geoData) {
        return this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: geoData,
                exclude: ["AQ"],
                fill: am5.color(0xedeae0),
            })
        )
    }

    addModalCancel = () => {}

    setSearchModal() {
        this.countryModal = am5.Modal.new(this.root, {
            content: `
            <h3 id="modal-heading"></h3><button id="modal-close-button">close</button>
            <legend id="search-legend">Search for tracks using Deezer's API</legend>
            <search id="search-div">
            <label id="query-field-label" for="query-field">Keywords:</label>
            <input type="field" id="query-field" name="query-field" placeholder="Enter any keyword" style="flex-grow: 1;"/>
            </search>
            <div id="results-div">
            </div>
        `,
        })

        this.countriesSeries.mapPolygons.template.events.on("click", (ev) => {
            this.handleCountryClick(ev)
        })

        this.modalContent = this.countryModal.getPrivate("content")
        this.modalContent.setAttribute("id", "modal-content")
    }

    handleCountryClick = (ev) => {
        this.view.currentCountry.element = ev.target

        state.createEffect(() => {
            this.view.currentCountry.id = this.view.currentCountry.element.dataItem.dataContext.id
            this.view.currentCountry.name = this.view.currentCountry.element.dataItem.dataContext.name
            this.view.setModalHeading()
        })

        this.countryModal.open()

        const cancelButton = document.getElementById("modal-close-button")

        cancelButton.onclick = () => {
            this.countryModal.cancel()
        }
    }

    setCountriesData(data) {
        this.countriesSeries.mapPolygons.template.setAll({ templateField: "enabledSettings" })
        this.countriesSeries.data.setAll(data)
    }

    buildTooltip() {
        this.tooltip = am5.Tooltip.new(this.root, {
            getFillFromSprite: false,
            labelText: '{"id"}',
        })

        this.tooltip.get("background").setAll({
            strokeOpacity: 0,
        })
    }
}

export default AmMap
