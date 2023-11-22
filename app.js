import SingletonFactory from "./src/factory"
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldHigh";
import am5geodata_worldOutlineHigh from "@amcharts/amcharts5-geodata/worldOutlineHigh"
const factory = new SingletonFactory

let root = am5.Root.new("chartdiv");

let chart = root.container.children.push(
    am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        panX: "rotateX",
        panY: "none",
        wheelY: "zoom",
        minZoomLevel: 0.5,
    })
);


let outlineSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldOutlineHigh,
    })
);

outlineSeries.mapPolygons.template.setAll({
    shadowColor: am5.color(0x000000),
    shadowBlur: 10,
    shadowOffsetY: 4,
    shadowOffsetX: 0,
    shadowOpacity: 0.4,
    fillOpacity: 1,

});

let polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldHigh,
        exclude: ["AQ"],
        fill: am5.color(0xedeae0),
    })
);

polygonSeries.mapPolygons.template.setAll({
    interactive: true,
})
polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(0xffe500)
});
let tooltip = am5.Tooltip.new(root, {
    getFillFromSprite: false,
});
tooltip.get("background").setAll({
    fill: am5.color(0xffd000),
    fillOpacity: 0.8
});
polygonSeries.set("tooltip", tooltip);
polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    templateField: "polygonSettings"
});

const app = factory.getApp()
// const url = window.location.toString()
// if (!url.includes('access_token')) {
//     window.location.href = 'https://connect.deezer.com/oauth/auth.php?app_id=646361&redirect_uri=http://localhost:5173/MyTopTracks/MTT.html&perms=basic_access,listening_history&response_type=token&width=500', '', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
//     width=400,height=400`
// }
// const token = window.location.hash.split('=')[1].split('&')[0]

// if (token) {
// }

await app.model.getTopTracks()



