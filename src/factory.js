import VM from "./VM"
import Model from "./model"
import View from "./view"

class SingletonFactory {
    constructor() {
        this.ctrl
        this.view
        this.model
        this.app
    }
    #createModel() {
        this.model = new Model
        this.model.constructor = () => { return this.model }
    }
    getModel() {
        if (this.model == null) {
            this.#createModel()
            return this.model
        } else { return this.model }
    }
    #createCtrl() {
        this.ctrl = new VM(this.model)
        this.ctrl.constructor = () => { return this.ctrl }
    }
    getCtrl() {
        if (this.ctrl == null) {
            this.#createCtrl()
            return this.ctrl
        } else { return this.ctrl }
    }
    #createView() {
        this.view = new View(this.ctrl)
        this.view.constructor = () => { return this.view }
    }
    getView() {
        if (this.view == null) {
            this.#createView()
            return this.view
        } else { return this.view }
    }
    #createApp() {
        this.app = {
            model: this.getModel(),
            VM: this.getCtrl(),
            view: this.getView(),
        }
        this.app.constructor = () => { return this.app }
    }
    getApp() {
        if (this.app == null) {
            this.#createApp()
            return this.app
        } else { return this.app }
    }
}

export default SingletonFactory