import prisma from "../db";
import { Tarefa } from "../types";

export const listarTarefas = async (): Promise<Tarefa[]> => {
  return prisma.tarefa.findMany();
};

export const criarTarefa = async (descricao: string): Promise<Tarefa> => {
  return prisma.tarefa.create({ data: { descricao, status: false } });
};

export const excluirTarefa = async (id: number): Promise<void> => {
  await prisma.tarefa.delete({ where: { id } });
};
export const atualizarTarefa = async (
  id: number,
  status: boolean
): Promise<Tarefa> => {
  return prisma.tarefa.update({ where: { id }, data: { status } });
};
