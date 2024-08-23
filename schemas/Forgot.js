const mongoose = require('mongoose');

const ForgotSchema = new mongoose.Schema({
    email:{type:String,unique:true, require:true},
    token:{type:String,require:true}, 
},{timestamps:true});

if(!mongoose.models.Forgot){
    mongoose.model('Forgot', ForgotSchema);
}
export default mongoose.models.Forgot