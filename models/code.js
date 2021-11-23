const mongoose = require('mongoose');

let codeSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    vipCode:String
    
})
module.exports =mongoose.model('Code',codeSchema);
//in order to export a model, we need to invoke the model constructor and pass it a string represents the name of the collection and a reference to the schema.