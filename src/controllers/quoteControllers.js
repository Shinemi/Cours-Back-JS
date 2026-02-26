import Quote from '../models/quoteModel.js'

// Citations par défaut utilisées si la base de données est vide
const defaultQuote = [
    {quote:'le succes est la somme de petits efforts répétés jour après jour' ,author :"Albert Einstein"},
    {quote:"il n'y a qu'une facon d'échouer : ne pas essayer",author :"Albert Einstein"},
    {quote:"l'avenir appartient à ceux qui croient en la beauté de leurs rêves",author :"Albert Einstein" },
    {quote:"ne revez pas que ça arrive, faites que ça arrive",author :"Albert Einstein" },
]

// Récupérer une citation aléatoire (avec fallback sur les citations par défaut)
export const getRandomQuote = async (req, res) => {
    try{
        // countDocuments() retourne le nombre total de citations dans la base
        const count = await Quote.countDocuments()
        
        // Si la base est vide, retourner une citation par défaut aléatoirement
        if(count === 0){
            const randomIndex = Math.floor(Math.random() * defaultQuote.length)
            return res.status(200).json(defaultQuote[randomIndex])
        }
        
        // Sinon, récupérer une citation aléatoire de la base avec skip(random)
        // skip() saute les N premiers documents, ce qui permet de sélectionner aléatoirement
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
        // Récupérer l'ID depuis les paramètres d'URL (/quotes/:id)
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

        // Mise à jour avec options: 
        // - { new: true } retourne le document mis à jour (sinon retourne l'ancien)
        // - { runValidators: true } vérifie les validations du schéma MongoDB
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

export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.status(200).json(quotes)
    } catch (error) {
        console.error("erreur de récupération ", error)
        res.status(500).json({message: error.message})
    }

}