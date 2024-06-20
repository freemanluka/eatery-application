const menuModel = require("../models/menuItem");
const orderModel = require("../models/order");
const { dishMenuMsg } = require("../utils/emails/contact");

const StatusCode = require("../utils/statusCodes");



const getMenu = async (req, res) => {
    
    
    const {items} = req.body; // Array of { dishId, quantity }

    console.log(items)

    const menuItems = await menuModel.find({items})

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Here's our updated Menu",
        data: {
            menuItems
        },
    });
};

const orderMenu = async (req, res) => {
    
    
    const {items, email} = req.body;

    console.log(items)
    
    // const order = await orderModel.findone({ item : items})

    
    // Calculate total price based on menu items and quantities
    let totalPrice = 0;
    for (item of items) {
        const menuItem = await menuModel.findById(item.dishId);
        if (menuItem) {
            totalPrice += menuItem.price * item.quantity;
        }
    }

    // Save order details (you can adjust this part based on your OrderModel)
    const newOrder = new orderModel({ items, totalPrice });
    await newOrder.save();

    await dishMenuMsg (email)

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Order placed successfully",
        data: {
            totalPrice
        },
    });

};


module.exports = {
    getMenu,
    orderMenu,
}