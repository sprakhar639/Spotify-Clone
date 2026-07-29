const mongoose=require('mongoose');


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    }
    catch(error){
        console.log("Not Connected to Database",error);
    }
}


module.exports=connectDB