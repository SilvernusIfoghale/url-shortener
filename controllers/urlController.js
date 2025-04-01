import Url from "../models/urlSchema.js";

//create Url function
const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = Math.random().toString(16).substring(2, 6);
    if (!originalUrl) {
      return res.status(400).json("OriginalUrl is required");
    }
    //check if url already exists
    const isUrlExists = await Url.findOne({ originalUrl });
    if (isUrlExists) {
      return res.status(400).json("Url already exist");
    }
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    res.status(201).json({
      success: true,
      newUrl,
    });
  } catch (error) {
    console.log(`Error`, error);
    res.status(500).json("Internal Server Error");
  }
};

//get Urls function
const getUrls = async (req, res, next) => {
  try {
    const urls = await Url.find({});
    res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    console.log(`Error`, error);
    res.status(500).json("Internal Server Error");
  }
};

//get url function
const getUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      return res.status(400).json("ShortUrl is required");
    }
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      res.status(404).json("Url not found");
    }
    res.status(200).json(url);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500).json("Internal Server Error");
  }
};

//redirect

const redirectUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      return res.status(400).json("ShortUrl is required");
    }
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json("URL not found");
    }
    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const { originalUrl } = req.body;

  if (!shortUrl || !originalUrl) {
    return res
      .status(400)
      .json(
        "ShortUrl in route params & originalUrl in the request body is required"
      );
  }
  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl },
      {
        originalUrl,
      },
      {
        new: true,
      }
    );
    if (!url) {
      return res.status(404).json("URL not found to update");
    }
    res.status(200).json(url);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500).json("Internal Server Error");
  }
};

export { createShortUrl, getUrls, getUrl, redirectUrl, updateUrl };
