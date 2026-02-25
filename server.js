import process from 'process'
import app from './src/app.js'
import connectDB from './src/config/db.js'
// On connecte la base de données
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`serveur lancé sur http://localhost:${PORT}`)
})