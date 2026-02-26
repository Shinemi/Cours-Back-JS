import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Veuillez ajouter un mail"],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Veuillez ajouter un mail valide'
            ]
        },
        password: {
            type: String,
            required: [true, 'Veuillez ajouter un mot de passe'],
            minlength: 8,
            select: false // Ne pas retourner le mot de passe par défaut
        }
    },
    {
        timestamps: true
    }
)

// Hasher le mot de passe avant la sauvegarde
userSchema.pre('save', async function (next){
    if (!this.isModified('password')){
        return 
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User