import app from "./app"
import { AppDataSource } from "./db";
import dotenv from 'dotenv'
dotenv.config();
async function main() {
    try {
        AppDataSource.initialize()
        console.log('Database connected');
        app.listen(3002)
        console.log('SERVER LISTEN ON PORT ', 3002);
    }
    catch (error) {
        console.error(error);
    }
}

main();
