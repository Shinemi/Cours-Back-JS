import mongoose from 'mongoose'
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);


const connectDB =  async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURL)
        console.info(`MongoDB connecté : ${connect.connection.host}`)
    } catch (error) {
        console.error(`Erreur : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB