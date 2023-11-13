
class Card {
    constructor(country) {
        this.id = country.id
        this.track = country.track
        this.artist = country.artist
        this.images = country.images
        this.position = country.element.getBoundingClientRect()
        this.chartCard = this.create("article");
        this.imgDiv = this.create("div")

        this.infoSection = this.create("section")

        this.header = this.create('h3');

        this.trackPara = this.create('p');

        this.artistPara = this.create('p');

        this.setValues()
        this.setAttributes()

        this.chartCard.appendChild(this.imgDiv)
        this.chartCard.appendChild(this.infoSection)
        this.infoSection.appendChild(this.header)
        this.infoSection.appendChild(this.trackPara)
        this.infoSection.appendChild(this.artistPara)
    }
    setValues() {
        this.header.innerHTML = '#<b>1</b> in ' + this.id;
        this.trackPara.innerText = this.track;
        this.artistPara.innerText = this.artist;
    }
    setAttributes() {
        this.chartCard.id = this.id
        this.chartCard.setAttribute('style', `top: ${parseInt(this.position.y)}px; left: ${parseInt(this.position.x)}px;`)
        this.chartCard.classList.add('chart-card');
        this.imgDiv.classList.add('card-img-div');
        this.trackPara.classList.add('card-track');
        this.artistPara.classList.add('card-artist');
        this.infoSection.classList.add('card-info-section');
        this.header.classList.add('card-header');

        if (this.images != undefined) {
            this.imgDiv.setAttribute('style', `background-image: url(${this.images.coverart})`)
        } else {
            this.imgDiv.setAttribute('style', `background-image: url(./Carte/retro-vinyl-record-icon-vector-illustration.jpg)`)
        }
    }
    create(value) {
        return document.createElement(value)
    }
}

export default Card