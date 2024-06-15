const routes = require('express').Router();
const stateController = require('../../controllers/state.controler')
// const stateController = require('../../controllers/state.controler')

routes.post("/createState",stateController.createState)
routes.get("/stateLogin",stateController.stateLogin) 
routes.get("/stateAll",stateController.stateAll)
routes.put("/updateState/:id",stateController.updateState)
routes.delete("/deleteState/:id",stateController.deleteState)
routes.get("/findState/:id",stateController.findState)
routes.get("/findStateCategory",stateController.findStateCategory)
module.exports = routes;