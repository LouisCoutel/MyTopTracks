import discogsToken from discogsToken.js

class DiscogsAPIHandler {
    constructor() {
        this.options = {
            method: 'GET', headers: {
                'user-agent': 'MyTopTracks/1.0.0 +https://louiscoutel.github.io',
                'accept': 'application/json',
                'Authorization': discogsToken
            }
        }
    }
    async searchAlbum(trackUrl, artistUrl) {
        const url = `https://api.discogs.com/database/search?query=${trackUrl}&type=master&page=1&per_page=1`
        const res = await fetch(url, this.options)
        if (res.ok) {
            const data = await res.json()
            if (data.results.length > 0) {
                return await data.results[0].country
            }
        }
    }
}

const discogsHandler = new DiscogsAPIHandler
export default discogsHandler