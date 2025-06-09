// import {sql} from "../config/db.js";
import { sql } from "../config/db.js";

export async function CreateTransactionsbyUserID(req, res) {
    try {
        const { title, amount, category, user_id } = req.body;

        if (!title || !category || !user_id || amount === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES(${user_id}, ${title}, ${amount}, ${category})
            RETURNING *`;

        console.log("New transaction created:", transaction);

        res.status(201).json(transaction[0]);

    } catch (error) {
        console.error("Error creating the transaction:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function GetTransactionsbyUserID(req, res) {

    try {
        const { userID } = req.params;
        console.log(userID);
        const transactions = await sql`
                SELECT * FROM transactions WHERE user_id = ${userID}
                ORDER BY created_at DESC`;
        console.log("Transactions retrieved for user:", userID);
        res.status(200).json(transactions);

    } catch (error) {
        console.error("Error getting the transaction:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deletedTransactionbyUserID(req, res) {

    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }
        const deletedTransaction = await sql`
                DELETE FROM transactions WHERE id = ${id} RETURNING *`;

        if (deletedTransaction.length === 0) {
            return res.status(404).json({ message: "trnasaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });

    } catch (error) {
        console.error("Error deleting the transaction:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetSummarybyUserID(req, res) {
    try {
        const { userID } = req.params;
        const BalanceResult = await sql`
      SELECT  coalesce(sum(amount), 0) as balance from transactions where user_id = ${userID}        
    `
        const IncomeResult = await sql`
      SELECT coalesce(sum(amount), 0) as income FROM transactions WHERE user_id = ${userID} AND amount > 0`

        const ExpenseResult = await sql`
      SELECT coalesce(sum(amount), 0) as expense FROM transactions WHERE user_id = ${userID} AND amount < 0`
        res.status(200).json({
            Balance: BalanceResult[0].balance,
            Income: IncomeResult[0].income,
            Expense: ExpenseResult[0].expense
        })

    } catch (error) {
        console.error("Error getting the transaction summary:", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
