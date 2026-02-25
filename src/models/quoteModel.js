import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    quote:{
        type: String,
        required: [true, 'veuillez entrer une citation']
    },
    author:{
        type: String,
        required: [true, 'veuillez entrer un auteur']
    }
})

const Quote = mongoose.model('Quote', quoteSchema)
export default Quote