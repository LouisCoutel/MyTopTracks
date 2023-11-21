class Selector {
    constructor(name) {
        this.name = name
        this.element = this.create("li")
        this.label = this.create("label")
        this.switch = this.create("input")
        this.setAttributes()
        this.setValue()
        this.assemble()
    }
    setAttributes() {
        this.label.setAttribute("for", `${this.name}`)
        this.switch.setAttribute("type", "checkbox")
    }
    setValue() {
        this.label.innerText = this.name
        this.switch.id = this.name
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