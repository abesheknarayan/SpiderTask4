var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
    user:String,
    comment:String,
    videoId:String
})

module.exports=mongoose.model("comments",commentSchema);