import express from 'express'
import { createQuote, deleteQuote, getAiQuote, getAllQuotes, getRandomQuote, updateQuote } from '../controllers/quoteController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getRandomQuote)

router.get('/all', getAllQuotes)

router.get('/aiquote', getAiQuote)

//          route, middleware, encoreMiddleware, etc, séparé par virgule, 
//                                                  à la fin c'est le CONTROLLER
router.post('/', protect, createQuote)

router.delete('/:id', protect, deleteQuote)

router.put('/:id', protect, updateQuote)


export default router