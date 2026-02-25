import express from 'express'


const app =  express()

// route de test pour l'accueil / 
app.get('/', (req,res) =>{
    res.json({meesage: "l'app se lance !"})
})

export default app;