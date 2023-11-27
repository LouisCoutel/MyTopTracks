class Card {
    constructor(item) {
        this.cardElement = this.create("article");
        this.imgDiv = this.create("div")
        this.infoSection = this.create("section")
        this.albumPara = this.create('p');
        this.trackPara = this.create('p');
        this.artistPara = this.create('p');
        this.genresPara = this.create('p')

        this.setValues(item)
        this.setAttributes(item)
        this.appendChildren()
    }
    setValues(item) {
        this.albumPara.innerText = item.album
        this.trackPara.innerText = item.title;
        this.artistPara.innerText = item.artist;
    }
    setAttributes(item) {
        this.cardElement.id = "card-" + item.deezer_id
        this.cardElement.classList.add('chart-card');
        this.imgDiv.classList.add('card-img-div');
        this.trackPara.classList.add('card-track');
        this.artistPara.classList.add('card-artist');
        this.albumPara.classList.add('card-album');
        this.infoSection.classList.add('card-info-section');
        this.albumPara.classList.add('card-albumPara');
        this.imgDiv.setAttribute('style', `background-image: url(${item.cover})`)
    }

    appendChildren() {
        this.cardElement.appendChild(this.imgDiv)
        this.cardElement.appendChild(this.infoSection)
        this.infoSection.appendChild(this.artistPara)
        this.infoSection.appendChild(this.trackPara)
        this.infoSection.appendChild(this.albumPara)
    }
    create(value) {
        return document.createElement(value)
    }
}

export default Card