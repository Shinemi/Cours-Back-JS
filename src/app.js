import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'

dotenv.config()

const app =  express()

// On défini les Routes de l'API
app.use('/api/quote' ,quoteRoutes)

// route de test pour l'accueil / 
app.get('/', (req,res) =>{
    res.json({meesage: "l'app se lance !"})
})





export default app;