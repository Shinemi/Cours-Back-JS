import mongoose from 'mongoose'
import { setServers } from "node:dns/promises";
// Configurer les serveurs DNS pour éviter les problèmes de résolution DNS sur certains réseaux
// 1.1.1.1 (Cloudflare) et 8.8.8.8 (Google) sont des serveurs DNS publics et fiables
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