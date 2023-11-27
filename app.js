import SingletonFactory from "./src/factory.js"

const factory = new SingletonFactory



const app = factory.getApp();
// const url = window.location.toString()
// if (!url.includes('access_token')) {
//     window.location.href = 'https://connect.deezer.com/oauth/auth.php?app_id=646361&redirect_uri=http://localhost:5173/MyTopTracks/MTT.html&perms=basic_access,listening_history&response_type=token&width=500', '', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
//     width=400,height=400`
// }
// const token = window.location.hash.split('=')[1].split('&')[0]

// if (token) {
// }


(async () => {
    await app.model.getAllTracks()
    await app.model.getCountries()
    await app.VM.setActiveCountries()
    await app.VM.setRandomTracksByCountry(1)
    await app.VM.setCountryAmChartsSetting()
})();




