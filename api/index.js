import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

//here we are configuring the dotenv package and connecting to the database
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to database");
}).catch((err) => {
  console.log(err);
});


//here we have created the server
const app = express();
app.use(express.json());
//this will allow json as the input to the server
app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});


app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})