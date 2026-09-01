import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2/promise";

dotenv.config();

export async function executeQuery<T extends RowDataPacket[]>(query: string, param: any[] = []): Promise<T> {
    const connection = await mysql.createConnection({
    // const connection = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 3306
    });
    const [rows] = await connection.execute<T>(query, param);
    await connection.end();
    return rows;
}