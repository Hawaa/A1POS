const mongoose = require("mongoose");



const billsSchema = mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhoneNumber : {type:String , required:true},
    totalAmount: { type: Number, required: true },
    tax: { type: String, required: true },
    subTotal: { type: String, required: true },
    paymentMode : {type:String , required:true},
    cartItems : {type:Array , required:true}
}, {timestamps : true});

const billModel = mongoose.model("bills", billsSchema);

module.exports = billModel;