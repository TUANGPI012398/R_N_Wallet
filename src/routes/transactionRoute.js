import express from "express";
import {
  CreateTransactionsbyUserID,
  deletedTransactionbyUserID,
   GetTransactionsbyUserID,
   GetSummarybyUserID
} from "../controller/transactionsController.js"; // Adjust the import path as necessary

const router = express.Router();

router.post("/", CreateTransactionsbyUserID);

router.get("/:userID", GetTransactionsbyUserID);

router.delete("/:id", deletedTransactionbyUserID);

router.get("/summary/:userID", GetSummarybyUserID)
export default router;