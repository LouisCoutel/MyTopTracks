
class Card {
    constructor(item) {
        this.cardElement = this.create("article");
        this.imgDiv = this.create("div")
        this.infoSection = this.create("section")
        this.header = this.create('h3');
        this.trackPara = this.create('p');
        this.artistPara = this.create('p');

        this.setValues(item)
        this.setAttributes(item)

        this.cardElement.appendChild(this.imgDiv)
        this.cardElement.appendChild(this.infoSection)
        this.infoSection.appendChild(this.header)
        this.infoSection.appendChild(this.trackPara)
        this.infoSection.appendChild(this.artistPara)
    }
    setValues(item) {
        this.header.innerHTML = item.artist
        this.trackPara.innerText = item.title;
        console.log(item.artist)
        this.artistPara.innerHTML = item.album;
    }
    setAttributes(item) {
        this.cardElement.id = "card-" + item.id
        this.cardElement.classList.add('chart-card');
        this.imgDiv.classList.add('card-img-div');
        this.trackPara.classList.add('card-track');
        this.artistPara.classList.add('card-artist');
        this.infoSection.classList.add('card-info-section');
        this.header.classList.add('card-header');

        this.imgDiv.setAttribute('style', `background-image: url(${item.cover})`)
    }
    create(value) {
        return document.createElement(value)
    }
}

export default Card