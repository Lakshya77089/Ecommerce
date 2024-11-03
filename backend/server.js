const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
dotenv.config({path:"backend/config/config.env"});
connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`);
})

//unhandled promise rejection (jab like mongo jaise url me dekat ho toh sidha fata fat and karna hota ha usse )
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });