export default class SearchResult {
    constructor(result, VM, country) {
        this.country = country
        this.VM = VM
        this.data = result
        this.element = this.create("article")
        this.element.id = result.id
        this.cover = this.create("img")
        this.detailsSection = this.create("section")
        this.artist = this.create("p")
        this.title = this.create("p")
        this.selectButton = this.create("button")

        this.setAttributes()
        this.setValues()
        this.appendChildren()
        this.setEvent()
    }

    setAttributes() {
        this.element.setAttribute("class", "search-result")
        this.cover.setAttribute("class", "search-result-cover")
        this.detailsSection.setAttribute("class", "sr-details-section")
        this.artist.setAttribute("class", "sr-artist")
        this.title.setAttribute("class", "sr-title")
        this.selectButton.setAttribute("class", "sr-select-button")
    }

    setValues() {
        this.cover.setAttribute("src", this.data.album.cover)
        this.artist.innerText = this.data.artist.name
        this.title.innerText = this.data.title
        this.selectButton.innerHTML = "select"
    }

    appendChildren() {
        this.element.appendChild(this.cover)
        this.element.appendChild(this.detailsSection)
        this.detailsSection.appendChild(this.artist)
        const dash = this.create("p")
        dash.innerHTML = "-"
        this.detailsSection.appendChild(dash)
        this.detailsSection.appendChild(this.title)
        this.element.appendChild(this.selectButton)
    }

    setEvent() {
        this.selectButton.onclick = () => {
            this.VM.addSuggested(this.data, this.country)
        }
    }

    static create(value) {
        return document.createElement(value)
    }
}
