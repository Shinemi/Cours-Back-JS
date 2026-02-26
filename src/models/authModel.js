import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
    email:{
        type: String,
        required: [true, 'veuillez entrer un email'],
        unique: true,
        // Expression régulière pour valider le format email: vérifier que le format respecte xxx@yyy.zz
        match:[/^\w+([.-]?\w)*@\w+([.-]?\w)*(\..\w{2,3})+$/, 'veuillez entrer un email valide']
    }, 
    
    password:{
        type: String,
        required: [true, 'veuillez entrer un mot de passe'],
        minlength: [8, 'le mot de passe doit faire au moins 8 caractères'],
        // Ne jamais retourner le mot de passe dans les réponses API pour des raisons de sécurité
        select: false
    },
    },
    {
        // Ajouter automatiquement les champs createdAt et updatedAt pour suivre les dates
        timestamps: true
    }
)

// Middleware Mongoose: hacher le mot de passe AVANT de l'enregistrer en base de données
userSchema.pre('save',async function (next){
    // Ne hacher que si le mot de passe a été modifié (pas si d'autres champs changent)
    if(!this.isModified('password')){
        return 
    }   
    // Générer un "sel" pour le hashage avec 10 tours (plus de tours = plus sécurisé mais plus lent)
    const salt = await bcrypt.genSalt(10)
    // Hacher le mot de passe + sel ensemble
    this.password = await bcrypt.hash(this.password, salt)
    
})

// Méthode custom: comparer le mot de passe entré par l'utilisateur avec le mot de passe hashé en base
// Retourne true/false sans jamais exposer le mot de passe en clair
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User