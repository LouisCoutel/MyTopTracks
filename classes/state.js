const propsToEffects = {}
const dirtyEffects = []
let currentEffect
let queued = false

export function createState(state) {
    return new Proxy(state, {
        get(obj, prop) {
            onGet(prop)
            return obj[prop]
        },
        set(obj, prop, value) {
            obj[prop] = value
            onSet(prop, value)
            return true
        },
        ownKeys(obj) {
            return Reflect.ownKeys(obj)
        }
    })
}

export function onGet(prop) {
    if (currentEffect) {
        const effects = propsToEffects[prop] ?? (propsToEffects[prop] = [])
        effects.push(currentEffect)
    }
}

export function flush() {
    while (dirtyEffects.length) {
        dirtyEffects.shift()()
    }
}

export function onSet(prop, value) {
    if (propsToEffects[prop]) {
        dirtyEffects.push(...propsToEffects[prop])
        if (!queued) {
            queued = true
            queueMicrotask(() => {
                queued = false
                flush()
            })
        }
    }
}

export function createEffect(effect) {
    currentEffect = effect
    effect()
    currentEffect = undefined
}



