import express from "express";
import { homeController } from "../controllers/homeController.js";
import { searchController } from "../controllers/searchController.js";

const router = express.Router();
router.get("/", homeController);
router.post("/autocomplete", searchController);

export default router;