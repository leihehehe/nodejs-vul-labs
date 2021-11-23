const mongoose = require('mongoose');

let userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    vip:Boolean
    
})
module.exports =mongoose.model('User',userSchema);
//in order to export a model, we need to invoke the model constructor and pass it a string represents the name of the collection and a reference to the schema.