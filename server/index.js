import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/user.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()


const connect = async () => {
    const mongo = process.env.MONGO
    try{
     await mongoose.connect(mongo);
     console.log("Connected to MongoDB")
    }catch(error){
    throw error
    }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB Disconnected!")
});

mongoose.connection.on("connected", ()=> {
    console.log("mongoDB Connected!")
});




//middlewares 

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// app.get("/api", (req, res)=>{
//     res.send("hello Epu")
// });

app.listen(5000, ()=> {
    connect()
    console.log("Connected to Backend Server!")
})



