import process from 'process'
import app from './src/app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`serveur lancé sur http://localhost:${PORT}`)
})