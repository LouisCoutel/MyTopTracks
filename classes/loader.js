class Loader {
    constructor() {
        this.loaderElement = document.createElement('div')
        this.loaderElement.setAttribute("class", "loading")
        this.spinner = document.createElement('span')
        this.spinner.setAttribute("class", "spinner")
        this.loaderElement.appendChild(this.spinner)
    }
    startAnimation() {
        document.body.appendChild(this.loaderElement)
    }
    stopAnimation() {
        this.loaderElement.classList.toggle("loading")
        this.loaderElement.classList.toggle("loaded")
        document.body.removeChild(this.loaderElement)
    }
}

const loader = new Loader()

export default loader