import { connect } from "mongoose";
import dotenv from 'dotenv'
//Configured dotenv
dotenv.config();

async function conn() {
    try {
        await connect(process.env.ATLAS_URI);
    }
    catch (err) {
        console.log(err)
    }
}

conn();