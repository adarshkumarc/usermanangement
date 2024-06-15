const routes = require('express').Router();
const incomeControler = require('../../controllers/income.controler')

routes.post("/calProfit",incomeControler.calProfit)

module.exports = routes;