const mongoose = require("mongoose");



const menuSchema = mongoose.Schema(
    {
        _dishID: {type: String},
        dishName: {type: String},
        discription: {type: Number},
        price: {type: Number},
    });

module.exports = mongoose.model("Menu", menuSchema);
