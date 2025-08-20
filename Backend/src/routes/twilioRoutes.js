import express from "express";
const router = express.Router();
import cadastrarNumero from "../controllers/twilioController.js";

// Rota para cadastrar número
router.post("/cadastrar-numero", cadastrarNumero);

export default router;
