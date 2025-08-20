import express from "express";
import twilioRoutes from "./routes/twilioRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", twilioRoutes);

const PORT = 1581;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
