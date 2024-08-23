const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type:String, require:true},
    email:{type:String,unique:true, require:true},
    phone:{type:String,default:''},
    password:{type:String, require:true},
    address:{type:String, default:''},
    pincode:{type:String, default:''},
    
    
},{timestamps:true});

if(!mongoose.models.User){
    mongoose.model('User', UserSchema);
}
export default mongoose.models.User