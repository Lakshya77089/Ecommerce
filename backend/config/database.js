const mongoose=require("mongoose");
const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true}).then(
        (data)=>{
            console.log(`Mongodb connected with servers: ${data.connection.host}`);
        });
}
module.exports=connectDatabase
    