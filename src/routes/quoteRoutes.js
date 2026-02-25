import express from "express";
import { createQuote, deleteQuote, getAllQuotes, getRandomQuote, updateQuote } from "../controllers/quoteControllers.js";
import { get } from "mongoose";

const router = express.Router();
//on va pouvoir gérer les routes
         //la route / middleware (si on utilise), controller
    //route, controller -> la fonction qui vient du controller
router.get("/", getRandomQuote)
router.get("/all", getAllQuotes)

router.post("/", createQuote)

router.delete("/:id", deleteQuote)

router.put("/:id", updateQuote)



export default router;