import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactoins,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactoins);
router.get("/geography", getGeography);

export default router;
