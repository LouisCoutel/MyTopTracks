const fs = require('fs')
const jsonData = require('./countries+states+cities.json')
const csc = jsonData.map(item => {
    return {
        name: item.name, code: item.iso2, continent: item.region, states: item.states.map(state => {
            return state.name
        }), cities: item.states.map(state => { return state.cities.map(city => { return city.name }) }).flat()
    }
})

console.log(csc[0])

fs.writeFileSync("./csc.json", JSON.stringify(csc))
