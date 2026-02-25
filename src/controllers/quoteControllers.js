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
    try{
        const { quote, author } = req.body
        if(!quote || !author){
            res.status(400)
            throw new Error('veuillez entrer une citation et un auteur')
        }

        const quoteRegistered = await Quote.create({quote, author})
        res.status(201).json(quoteRegistered)
    } catch (error) {
        console.error("erreur d'enregistement", error)
        res.status(500).json({message: error.message})
    }
}

export const deleteQuote = async (req, res) => {
    try {
        //on récup l'id des parametres de l'url
        const quote = await Quote.findById(req.params.id)
        if(!quote){
            res.status(404)
            throw new Error('citation non trouvée')
        }
        await quote.deleteOne()
        res.status(200).json({message: "citation supprimée"})
    } catch (error) {
        console.error("erreur de suppression", error)
        res.status(500).json({message: error.message})
    }
}

export const updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
        if(!quote){
            res.status(404)
            throw new Error('citation non trouvée')
        }

        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators:true } 
        )
        res.status(200).json(updatedQuote)
    } catch (error) {
        console.error("erreur de mise à jour", error)
        res.status(500).json({message: error.message})
    }
}