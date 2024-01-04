export class TrackData {
    constructor(track, isLoved, isSuggested) {
        this.title = track.title
        this.deezer_id = track.id
        this.album_id = track.album.id
        this.artist_id = track.artist.id
        this.is_loved_track = isLoved
        this.is_suggested_track = isSuggested
    }
}

export class ArtistData {
    constructor(track, countryId, tags) {
        this.name = track.artist.name
        this.deezer_id = track.artist.id
        this.picture = track.artist.picture_medium
        this.country_id = countryId
        this.tags = tags
    }
}

export class AlbumData {
    constructor(track, genres) {
        this.title = track.album.title
        this.cover = track.album.cover_medium
        this.deezer_id = track.album.id
        this.artist_id = track.artist.id
        this.genres = genres
    }
}