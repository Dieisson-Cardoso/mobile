import express from "express";
import {
  listarTarefas,
  criarTarefa,
  excluirTarefa,
  atualizarTarefa,
} from "../controllers/tarefas";

const router = express.Router();

router.get("/", async (req, res) => {
  const tarefas = await listarTarefas();
  res.json(tarefas);
});

router.post("/", async (req, res) => {
  const { descricao } = req.body;
  const novaTarefa = await criarTarefa(descricao);
  res.json(novaTarefa);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await excluirTarefa(parseInt(id));
  res.status(204).send();
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await atualizarTarefa(parseInt(id), status);
  res.status(204).send();
});

export default router;
