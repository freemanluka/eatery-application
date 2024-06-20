const mongoose = require("mongoose");



const orderSchema = mongoose.Schema(
    {
        _dishID: {type: String},
        itemName: {type: String},
        orderQuantity: {type: Number},
        // orderTime: {type: Date},
    })

module.exports = mongoose.model("Order", orderSchema);
