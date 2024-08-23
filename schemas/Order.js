const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {type:String, require:true},
    address:{type:String, require:true},
    amount:{type:Number, require:true},
    orderId:{type:String, require:true},
    razorpayFields:{type:Object, require:true},
    status:{type:String,require:true},
    products:{type:Object,require:true}
},{timestamps:true});

if(!mongoose.models.Order){
    mongoose.model('Order', OrderSchema);
}

export default mongoose.models.Order