import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

dotenv.config()

const app =  express()

// Autoriser les requêtes CORS (essentiels quand le frontend et backend tournent sur des ports différents)
app.use(cors())

// Parseurs pour traiter automatiquement le corps des requêtes en JSON ou URL-encoded
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Enregistrer les routes principales de l'API
app.use('/api/quote' ,quoteRoutes)
app.use('/api/auth', authRoutes)

// route de test pour l'accueil / 
app.get('/', (req,res) =>{
    res.json({message: "l'app se lance !"})
})





export default app;