import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json());

//routes
app.use("/api/urls", urlRoutes);

//Error Handler
app.use(errorHandler);

//run server
const runServer = () => {
  try {
    connectDatabase();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Error", error);
  }
};

runServer();
