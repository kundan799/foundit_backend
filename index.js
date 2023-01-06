require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose")


const app = express();
const cors=require("cors")
console.log(process.env.PORT)
const PORT=process.env.PORT || 8080
app.use(cors())
app.use(express.json());


const {connection}=require("./config/db.js")
const {userController}=require("./Routes/User.route.js")
const {adminController}=require("./Routes/Admin.route.js")
const {jobController}=require("./Routes/Job.route.js")
const {crudController}=require("./Routes/AdminCrud.route.js")






// mongoose connect
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to momgodb");
    } catch (err) {
      console.log(err);
    }
  };
  
  // mongo disconnected
  mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
  });
  // mongo connected
  mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
  });
app.get("/", (req, res) => {
  res.send("welcome to the  app");
});



app.use("/user", userController);
app.use("/admin", adminController);
app.use("/job",jobController);
app.use("/registeredusers",crudController);


app.listen(PORT, async () => {
    connect()
try{
    console.log("Listening to PORT",PORT);

}catch(err){
    console.log("port error")
}
 //
});