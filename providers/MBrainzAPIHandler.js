
class MBrainzAPIHandler {
    constructor() {
        this.options = {
            method: 'GET', headers: {
                'user-agent': 'MyTopTracks/1.0.0 +https://louiscoutel.github.io',
                'accept': 'application/json',
            }
        }
    }
    async searchArtist(track) {
        const artistUrl = encodeURIComponent(track.artist.name)
        const url = `https://musicbrainz.org/ws/2/artist?query=${artistUrl}&limit=1`
        const res = await fetch(url, this.options)
        if (res.ok) {
            const data = await res.json()
            const result = data.artists[0]
            console.log(result)
            if (result) {
                return {
                    name: result.area ? result.area.name : "France", code: result.country ? result.country : "FR"
                }
            } else {
                return { name: "France", code: "FR" }
            }
        }
    }
}

const mBrainzHandler = new MBrainzAPIHandler
export default mBrainzHandler