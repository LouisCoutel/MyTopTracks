class Selector {
    constructor(id) {
        this.id = id
        this.element = this.create("li")
        this.label = this.create("label")
        this.switch = this.create("input")
        this.setAttributes()
        this.setValue()
        this.assemble()
    }
    setAttributes() {
        this.label.setAttribute("for", `${this.id}`)
        this.switch.setAttribute("type", "checkbox")
    }
    setValue() {
        this.label.innerText = this.id
    }
    assemble() {
        this.element.appendChild(this.label)
        this.element.appendChild(this.switch)
    }
    create(value) {
        return document.createElement(value)
    }
}
export default Selector