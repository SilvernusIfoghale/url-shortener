import express from "express";
import { createShortUrl, getUrls } from "../controllers/urlController.js";

const router = express.Router();

router.post("/create", createShortUrl);

router.get("/", getUrls);

export default router;
