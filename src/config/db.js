import { neon } from '@neondatabase/serverless';
import dotenv from "dotenv";
dotenv.config();

export const sql = neon(process.env.DATABASE_URL)
export const PORT = process.env.PORT || 5001;

export async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                created_at DATE NOT NULL DEFAULT CURRENT_DATE
            );
        `; // -- The SQL query ends here with backticks and a semicolon
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initializing DB", error);
        process.exit(1); // status code 1 means failure, 0 success
    }
}