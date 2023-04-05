import express from "express";
import cors from "cors";
import router from "./routes/tarefas";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tarefas", router);

app.listen(3003, () => {
  console.log("Servidor iniciado na porta 3003");
});
