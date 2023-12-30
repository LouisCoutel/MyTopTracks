export default class State {
    #propsToEffects
    #dirtyEffects
    #queued
    #currentEffect
    #originalObject
    constructor(state) {
        this.#propsToEffects = {}
        this.#dirtyEffects = []
        this.#queued = false
        this.state = this.createState(state)
        this.#originalObject = state
    }

    createState = (state) => {
        return new Proxy(state, this.handler)
    }

    handler = () => {
        return {
            get(obj, prop) {
                this.onGet(prop)
                return obj[prop]
            },
            set(obj, prop, value) {
                obj[prop] = value
                this.onSet(prop, value)
                return true
            },
            ownKeys(obj) {
                return Reflect.ownKeys(obj)
            }
        }
    }
    onGet(prop) {
        if (this.#currentEffect) {
            const effects = this.#propsToEffects[prop] ?? (this.#propsToEffects[prop] = [])
            effects.push(this.#currentEffect)
        }
    }

    onSet(prop, value) {
        if (this.#propsToEffects[prop]) {
            this.#dirtyEffects.push(...this.#propsToEffects[prop])
            if (!queued) {
                this.#queued = true
                queueMicrotask(() => {
                    this.#queued = false
                    this.flush()
                })
            }
        }
    }

    flush() {
        while (this.#dirtyEffects.length) {
            this.#dirtyEffects.shift()()
        }
    }

    createEffect(effect) {
        this.#currentEffect = effect
        effect()
        this.#currentEffect = undefined
    }
}



