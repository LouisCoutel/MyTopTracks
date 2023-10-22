import SingletonFactory from "./factory.js"



const factory = new SingletonFactory

const app = factory.getApp()
app.controller.setAvailable()



