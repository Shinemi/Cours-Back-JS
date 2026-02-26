import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'

// Fonction pour générer un token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// Une fonction pour enregistrer un utilisateur
export const registerUser = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({message: "Aucune donnée envoyée"})
        }

        const { email, password } = req.body

        if(!email || !password){
            res.status(400)
            throw new Error("Veuillez fournir tous les champs")
        }

        // Vérifier si l'utilisatuer existe déjà
        const userExists = await User.findOne({ email })

        if(userExists){
            res.status(400)
            throw new Error("Cet utilisateur existe déjà");
        }

        // Créer l'utilisateur (le mdp sera hashé via le middleware mongoose)
        const user = await User.create({
            email,
            password
        })

        if(user){
            return res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        res.status(400)
        throw new Error("Données utilisateur invalides");
    } catch (error) {
        console.error('Enregistrement impossible : ', error)
        return res.status(500).json({message: error.message})
    }
}

// fonction pour se connecter en tant qu'utilisateur.
export const loginUser = async (req, res) => {
    try {
         if(!req.body){
            return res.status(400).json({message: "Aucune donnée envoyée"})
        }

        const { email, password } = req.body

        if(!email || !password){
            res.status(400)
            throw new Error("Veuillez fournir tous les champs")
        }

        // Vérifier l'email, on utiliser +password car on a select: false dans le model
        const user = await User.findOne({ email }).select('+password')

        // Vérifier le mot de passe
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        res.status(401)
        throw new Error("Email ou mot de passe incorrect");
    } catch (error) {
        console.error('Connexion impossible : ', error)
        return res.status(500).json({message: error.message})
    }
}