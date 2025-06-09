import express from "express";
import { initDB, PORT } from './config/db.js';
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoute.js"; // Adjust the import path as necessary


dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5001;

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



