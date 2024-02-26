import express, { urlencoded, json } from 'express';
const app = express();
import cors from 'cors'
import tasks from "./routes/tasks.js";
import dotenv from 'dotenv';

// Configured dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors());


app.use('/api/tasks', tasks);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}....`)
})
