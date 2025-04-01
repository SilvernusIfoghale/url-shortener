import express from "express";
import {
  createShortUrl,
  getUrl,
  getUrls,
} from "../controllers/urlController.js";

const router = express.Router();

//create short url
router.post("/create", createShortUrl);

//get all urls
router.get("/", getUrls);

//get single url
router.get("/:shortUrl", getUrl);

export default router;
