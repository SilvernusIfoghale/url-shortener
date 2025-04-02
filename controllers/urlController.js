import Url from "../models/urlSchema.js";

//create Url function
const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = Math.random().toString(16).substring(2, 6);
    if (!originalUrl) {
      res.status(400);
      return next(new Error("OriginalUrl is required"));
    }
    //check if url already exists
    const isUrlExists = await Url.findOne({ originalUrl });
    if (isUrlExists) {
      res.status(400);
      return next(new Error("OriginalUrl already shortened"));
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
    res.status(500);
    next(new Error(error.message));
  }
};

//get Urls function
const getUrls = async (req, res, next) => {
  try {
    const urls = await Url.find();
    res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    console.log(`Error`, error);
    res.status(500);
    next(new Error(error.message));
  }
};

//get url function
const getUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      res.status(400);
      return next(new Error("ShortUrl is required"));
    }
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      res.status(404);
      return next(new Error("Url not found"));
    }
    res.status(200).json(url);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500);
    next(new Error(error.message));
  }
};

//redirect

const redirectUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      res.status(400);
      return next(new Error("ShortUrl is required"));
    }
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      res.status(404);
      return next(new Error("Url not found"));
    }
    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500);
    next(new Error(error.message));
  }
};

//update url
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
      res.status(404);
      return next(new Error("Url not found"));
    }
    res.status(200).json(url);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500);
    next(new Error(error.message));
  }
};

const deleteUrl = async (req, res, next) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    res.status(400);
    return next(new Error("ShortUrl is required"));
  }

  try {
    const deletedUrl = await Url.findOneAndDelete({ shortUrl });
    if (!deletedUrl) {
      res.status(404);
      return next(new Error("Url not found"));
    }
    res.status(200).json(deletedUrl);
  } catch (error) {
    console.log(`Error`, error);
    res.status(500);
    next(new Error(error.message));
  }
};

export { createShortUrl, getUrls, getUrl, redirectUrl, updateUrl, deleteUrl };
