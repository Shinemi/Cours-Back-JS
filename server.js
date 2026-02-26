import process from 'process'
import app from './src/app.js'
import connectDB from './src/config/db.js'

// Établir la connexion MongoDB dès le démarrage du serveur
connectDB()

// Récupérer le port depuis les variables d'environnement, sinon utiliser 5000 par défaut
const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`serveur lancé sur http://localhost:${PORT}`)
})