import express from "express";
import { getRandomQuote } from "../controllers/quoteControllers.js";

const router = express.Router();
//on va pouvoir gérer les routes
         //la route / middleware (si on utilise), controller
    //route, controller -> la fonction qui vient du controller
router.get("/", getRandomQuote)

router.post("/", createQuote)

export default router;