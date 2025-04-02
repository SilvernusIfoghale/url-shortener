import express from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrl,
  getUrls,
  redirectUrl,
  updateUrl,
} from "../controllers/urlController.js";

const router = express.Router();

//create short url
router.post("/create", createShortUrl);

//get all urls
router.get("/", getUrls);

//get single url
router.get("/:shortUrl", getUrl);

//Redirect to originalUrl
router.get("/redirect/:shortUrl", redirectUrl);

//update original url with shortUrl
router.put("/:shortUrl", updateUrl);

//delete
router.delete("/:shortUrl", deleteUrl);

export default router;
