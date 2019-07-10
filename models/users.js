var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");

var userSchema= new mongoose.Schema({
    username:String,
    password:String,
    watched:[{
        imdbid:String,
        

    }],
    wantto:[{
        imdbid:String
    }],
    fav:[{
        imdbid:String
    }],
    trailerliked:[{
        vidId:String
    }],
    privacy:String


})
userSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("user",userSchema);