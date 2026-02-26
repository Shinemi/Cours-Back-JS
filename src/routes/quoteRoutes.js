import express from "express";
import { createQuote, deleteQuote, getAllQuotes, getRandomQuote, updateQuote } from "../controllers/quoteControllers.js";
import { get } from "mongoose";

const router = express.Router();

// GET / - Retourner une citation aléatoire
router.get("/", getRandomQuote)
// GET /all - Retourner TOUTES les citations de la base
router.get("/all", getAllQuotes)

// POST / - Créer une nouvelle citation
router.post("/", createQuote)

// DELETE /:id - Supprimer une citation par son ID
router.delete("/:id", deleteQuote)

// PUT /:id - Mettre à jour une citation existante
router.put("/:id", updateQuote)



export default router;