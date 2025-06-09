import express from "express";
import { initDB, PORT } from './config/db.js';
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoute.js"; 
import job from "./config/cron.js";


dotenv.config();

const app = express();
if(process.env.NODE_ENV === "production") job.start(); // Start the cron job only in non-production environments

// const PORT = process.env.PORT || 5001;

app.get("api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Middleware 
app.use(express.json());
app.use(ratelimiter);
app.use((req, res, next) => {
  console.log(`hey i checked a req, the method is:`, req.method, `.`);
  next();
});

app.get("/", (req, res) => {
  res.send("It's what is the method and url of this server");
});

app.use("/api/transactions", transactionRoute);


initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });

})



