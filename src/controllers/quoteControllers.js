const defaultQuote = [
    {quote:'le succes est la somme de petits efforts répétés jour après jour' },
    {quote:"il n'y a qu'une facon d'échouer : ne pas essayer"},
    {quote:"l'avenir appartient à ceux qui croient en la beauté de leurs rêves" },
    {quote:"ne revez pas que ça arrive, faites que ça arrive" },
]



export const getRandomQuote = (req, res) => {
    try{
        const randomIndex = Math.floor(Math.random() * defaultQuote.length)

        return res.status(200).json(defaultQuote[randomIndex])

        
    } catch (error) {
        console.error('erreur de quote')
    }
}