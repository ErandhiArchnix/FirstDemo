import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import { dbConfig } from "./database/dbConfig.mjs";
import bodyParser from 'body-parser';

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"], //requests originating from http://localhost:3000 are allowed to access the server's resources
        methods: ["GET", "POST", "PUT"],
        credentials: true, //This indicates that the server is willing to accept and send cookies as part of cross-origin requests.
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

dbConfig.createDatabaseAndTable();

app.use("/api/auth", authRoute);
app.use("/api/locations", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

