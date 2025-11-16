import express,{Application,Request,Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "../src/routes/uploadRoutes"

import connectDB from "./config/db";
dotenv.config()

const app:Application=express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/upload", uploadRoutes);

const PORT=process.env.PORT||5000;

  connectDB().then(()=>{
    app.listen(PORT,()=>{
      console.log(`server running at port ${PORT}`);
      
    })

  })

