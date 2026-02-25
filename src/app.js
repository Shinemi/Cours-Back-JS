import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'
import cors from 'cors'

dotenv.config()

const app =  express()

//permet de gérer les requetes cross-origin (quand le front et le back sont sur des ports différents)
app.use(cors())

//body parser 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// On défini les Routes de l'API
app.use('/api/quote' ,quoteRoutes)

// route de test pour l'accueil / 
app.get('/', (req,res) =>{
    res.json({meesage: "l'app se lance !"})
})





export default app;