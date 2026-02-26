import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'

// Fonction utilitaire: générer un JWT (JSON Web Token) avec l'ID utilisateur
// Ce token sera renvoyé au client et utilisé pour authentifier les requêtes futures
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,
         {expiresIn: '30d'}) // Le token expire automatiquement après 30 jours
}

//Fonction d'enregistrement: créer un nouvel utilisateur et retourner un token d'authentification
export const registerUser = async (req, res, next) => {
    try {
        if(!req.body){
            res.status(400).json({message: "veuillez entrer des données"})  
        }

        const { email, password } = req.body 

        if(!email || !password){
            res.status(400)
            throw new Error('veuillez entrer un email et un mot de passe')
        }    
        
        // Vérifier si l'utilisateur existe déjà (unique: true dans la base empoche les doublons)
        const userExists = await User.findOne({email})

        if(userExists){
            res.status(400)
            throw new Error('cet email est déjà utilisé')
        }

        // Créer l'utilisateur
        // Le mot de passe sera automatiquement hashé par le middleware pre('save') du modèle
        const user = await User.create({email, password})
        if(user){
            res.status(201).json({
                _id: user._id,
                email: user.email,
                // Générer un token JWT que le client stockera (localStorage, cookies, etc.)
                token: generateToken(user._id)
            })
        } 
        res.status(400)
        throw new Error('données invalides')
    } catch (error) {
        console.error("erreur d'enregistrement", error)
        res.status(500).json({message: error.message})
    }


}
//fonction pour connecter un utilisateur