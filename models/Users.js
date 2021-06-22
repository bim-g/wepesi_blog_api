const mongoose = require("mongoose");

const UserSchema=mongoose.Schema({
    fist_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    sexe_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date_created:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Users",UserSchema);