import express from "express";
import twilioRoutes from "./routes/twilioRoutes.js"; // Caminho e extensão corretos

const app = express();
app.use(express.json());

app.use("/api", twilioRoutes);

const PORT = 1581; // Corrigido a definição da porta
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
