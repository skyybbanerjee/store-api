import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import productRouter from "./routes/productsRouter.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import "express-async-errors"; // Just import this once
const app = express();
dotenv.config();


const PORT = process.env.PORT || 8000;

//connect to MongoDB()
connectDB();

app.use(express.json()); //not gonna use this in this project

//testing route..
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello, World from home! [localhost:8000] ✅... </h1> <p><a href='/api/v1/products'/>Products Route 🛒</p>"
  );
});

//routes
app.use("/api/v1/products", productRouter);

//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🛜`);
});
