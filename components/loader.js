class Loader {
    constructor() {
        this.loaderElement = document.createElement('div')

        this.loaderElement.id = "loader"

        this.spinner = document.createElement('span')

        this.spinner.setAttribute("class", "spinner")

        this.loaderElement.appendChild(this.spinner)


    }
    insertSelf() {
        document.body.appendChild(this.loaderElement)
        this.loaderElement.classList.toggle("transition", true)
        setTimeout(() => {
            this.loaderElement.classList.toggle("loaded", true)
        }, 100)
    }
    removeSelf() {
        document.body.removeChild(this.loaderElement)
    }
}

export default Loader