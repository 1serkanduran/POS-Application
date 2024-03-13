const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
},
{timestamps:true} //oluşturulduğu zamanı öğrenmek için
);

const Category =mongoose.model("categories", CategorySchema);
module.exports=Category;