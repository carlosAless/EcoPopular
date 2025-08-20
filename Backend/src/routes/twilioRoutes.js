import express from "express";
const router = express.Router();
import cadastrarNumero from "../controllers/twilioController.js";

router.post("/cadastrar-numero", cadastrarNumero);

export default router;
