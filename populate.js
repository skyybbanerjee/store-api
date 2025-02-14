//todo: dynamically adding data to the DB
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
//This works ⬇️✅
import fs from "fs/promises";
import ProductModel from "./models/productModel.js";
const productsJson = JSON.parse(
  await fs.readFile(new URL("./products.json", import.meta.url))
);
dotenv.config();

async function startServer() {
  try {
    await connectDB();
    await ProductModel.deleteMany(); //Optnl. - Will delete all, if already exists.
    await ProductModel.create(productsJson);
    console.log("Populate.js started/success ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
}

startServer();
