import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        quote: {
            type: String,
            required: [true, 'Veuillez ajouter le texte de la citation']
        },
        author: {
            type: String,
            required: [true, 'Veuillez ajouter un auteur']
        }
    }
)

const Quote = mongoose.model('Quote', quoteSchema)
export default Quote