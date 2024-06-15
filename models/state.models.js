const mongoose = require('mongoose');
var Schema = mongoose.Schema

const stateSchema = new Schema({
    stateName:{
        type:String,
        required:true,
    },
    stateAddress:{
        type:String,
        required:true,
    },
    stateCatogery:{
        type:String,
        required:true,
    },
    stateAcre:{
        type:String,
        required:true,
    },
    statePlants:{
        type:String,
        required:true,
    }

})
module.exports = mongoose.model("state",stateSchema)