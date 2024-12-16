import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
import TemperatureRouter from "./src/routers/temperature";
import cors from "cors";
import { verifyToken } from "./src/middlewares/verifyToken";
dotenv.config();

const app = express();
const dbUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.bt2i6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

app.use(verifyToken);
app.use("/temperature", TemperatureRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connect to db successfully");
  } catch (error) {
    console.log("Can not connect to database", error);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Can not connect to database", error);
  });
