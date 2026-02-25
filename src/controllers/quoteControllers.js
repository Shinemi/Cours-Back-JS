import Quote from '../models/quoteModel.js'

const defaultQuote = [
    {quote:'le succes est la somme de petits efforts répétés jour après jour' ,author :"Albert Einstein"},
    {quote:"il n'y a qu'une facon d'échouer : ne pas essayer",author :"Albert Einstein"},
    {quote:"l'avenir appartient à ceux qui croient en la beauté de leurs rêves",author :"Albert Einstein" },
    {quote:"ne revez pas que ça arrive, faites que ça arrive",author :"Albert Einstein" },
]



export const getRandomQuote = async (req, res) => {
    try{

        //countDocuments() -> pour compter le nombre d'entrées dans la base de données
        const count = await Quote.countDocuments()
        // la bdd est vide, on retourne une citation au hasard qui est enregistrée en dur
        if(count === 0){
            const randomIndex = Math.floor(Math.random() * defaultQuote.length)
            return res.status(200).json(defaultQuote[randomIndex])
        }
        
        //sinon récupérer une citation au hasard dans la base de données
        const random = Math.floor(Math.random() * count)
        const quote = await Quote.findOne().skip(random)
        res.status(200).json(quote)
        
    } catch (error) {
        console.error('erreur de quote')
    }
}

export const createQuote = async (req, res) => {
    console.log('création de quote')
}