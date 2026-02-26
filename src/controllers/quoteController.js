import Quote from "../models/quoteModel.js"
import { GoogleGenAI } from "@google/genai";
import z from "zod"

const defaultQuotes = [
    { quote: "Le succès c'est de passer d'échec en échec sans perdre son enthousiasme", author: "A"},
    { quote: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.", author: "A"},
    { quote: "L'avenir appartient à ceux qui croient à la beauté de leurs rêves.", author: "A"},
    { quote: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", author: "A"},
    { quote: "Ne rêvez pas que ce soit plus facile. Décidez d'être meilleur.", author: "A"}
]

export const getRandomQuote = async (req, res) => {
    try {
        // countDocuments() permet de compter le nombre d'entrée dans la BDD
        const count = await Quote.countDocuments()

        // Si la BDD est vide, on prend une phrase au hasard depuis le tableau qui est enregistré en dur.
        if (count === 0){
            const randomIndex = Math.floor(Math.random() * defaultQuotes.length)
            return res.status(200).json(defaultQuotes[randomIndex])
        } 

        // Sinon récupérer aléatoirement depuis MongoDB
        const random = Math.floor(Math.random() * count)
        // SELECT * FROM quote WHERE id = :random
        const quote = await Quote.findOne().skip(random)
        res.status(200).json(quote)

    } catch(error){
        console.error("Erreur de quote : ", error)
    }
}

export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find({})
        res.status(200).json(quotes)
    } catch (error) {
        console.error("Erreur de récupération ", error)
        res.status(500).json({ message: "Erreur de récupération" })
    }
}

export const createQuote = async (req, res) => {
    try {
        const { quote, author } = req.body

        if(!quote || !author){
            res.status(400)
            throw new Error("Veuillez fournir la citation et l'auteur")
        }

        const quoteRegistered = await Quote.create({quote, author})
        res.status(201).json(quoteRegistered)
    } catch (error){
        console.error("Erreur d'enregistrement : ", error)
        res.status(500).json({ message: error.message })
    }
}

export const deleteQuote = async (req, res) => {
    try {
        // On récupère l'id des paramètres de l'url
        const quote = await Quote.findById(req.params.id)

        if(!quote){
            res.status(404)
            throw new Error('Citation non trouvée')
        }

        await quote.deleteOne()
        res.status(200).json({ message: 'Citation supprimée' })
    } catch (error) {
        console.error("Erreur de suppression : ", error)
        res.status(500).json({message: error.message})
    }
}

export const updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)

        if(!quote){
            res.status(404)
            throw new Error('Citation non trouvée')
        }

        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        res.status(200).json(updatedQuote)
        
    } catch (error) {
        console.error("Erreur de modification : ", error)
        res.status(500).json({message: error.message})
    }
}

//controller qui utilise gemini pour générer des citations
export const getAiQuote = async (req, res) => {
    try{
        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API});

        const quoteSchema = z.object({
            quote:z.string(),
            author: z.string()
        })

        const req = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents: "donne moi une citation en francais",
            config: {
                responseMimeType: 'application/json',
                responseJsonSchema: z.toJSONSchema(quoteSchema)
            }
        })

        //texte brut retourné par gemini
        const jsonText = req.text

        //on converti en JSON
        const parsed = JSON.parse(jsonText)

        //vzlidation avec zod
        const validated = quoteSchema.parse(parsed)

        res.json(validated)

        console.log(req.text)
    } catch (error) {
        console.error("impossible de générer :",error)
        res.status(500).json({message : error.message})
    }
}