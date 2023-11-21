import Card from "../components/card"

class Item {
    constructor(item, index) {
        {
            this.id = index
            this.title = item.title
            this.album = item.album.title
            this.artist = item.artist.name
            this.cover = item.album.cover_medium
            this.countryId = item.country.code
            this.card = new Card(this)
        }
    }
}

export default Item