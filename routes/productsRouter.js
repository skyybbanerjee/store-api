import express from "express";
import {
  getAllProducts,
  getAllProductsStatic,
} from "../controllers/productsController.js";
const router = express.Router();

//Endpoints
router.get("/", getAllProducts);
router.get("/static", getAllProductsStatic);

export default router;
