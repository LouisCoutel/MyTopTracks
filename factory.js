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
    #createCtrl() {
        this.ctrl = new VM(this.view, this.model)
        this.ctrl.constructor = () => { return this.ctrl }
    }
    getCtrl() {
        if (this.ctrl == null) {
            this.#createCtrl()
            return this.ctrl
        } else { return this.ctrl }
    }
    #createView() {
        this.view = new View
        this.view.constructor = () => { return this.view }
    }
    getView() {
        if (this.view == null) {
            this.#createView()
            return this.view
        } else { return this.view }
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
    #createApp() {
        this.app = {
            model: this.getModel(),
            view: this.getView(),
            VM: this.getCtrl()
        }
        this.app.view.setVM(this.app.VM)
        this.app.model.setVM(this.app.VM)
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