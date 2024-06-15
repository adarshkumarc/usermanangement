const routes = require('express').Router();
const userController = require('../../controllers/user.controler')
const stateController = require('../../controllers/state.controler')
const utils =require("../../lib/utils")

routes.post("/createUser",userController.createUser)
routes.get("/loginUser",userController.loginUser)
routes.get("/getAllUsers",utils.authMiddleware,userController.getAllUsers)
routes.put("/updateUser/:id",utils.authMiddleware,userController.updateUser)
routes.delete("/userDelete/:id",userController.deleteUser)
routes.get("/findUserById/:id",userController.findUserById)


module.exports = routes;