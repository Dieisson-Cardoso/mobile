import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:3003/tarefas";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  const handleAddTarefa = async () => {
    if (descricao) {
      const response = await axios.post(API_URL, { descricao });
      setTarefas([...tarefas, response.data]);
      setDescricao("");
    }
  };

  const handleDeleteTarefa = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const handleToggleTarefa = async (id, status) => {
    await axios.put(`${API_URL}/${id}`, { status: !status });
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: !tarefa.status } : tarefa
      )
    );
  };

  const loadTarefas = async () => {
    const response = await axios.get(API_URL);
    setTarefas(response.data);
  };

  useEffect(() => {
    loadTarefas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nova Tarefa"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
        />
        <Button title="Adicionar" onPress={handleAddTarefa} />
      </View>
      <View style={styles.list}>
        {tarefas.map((tarefa) => (
          <View style={styles.tarefa} key={tarefa.id}>
            <Text
              style={[
                styles.tarefaDescricao,
                tarefa.status && styles.tarefaConcluida,
              ]}
            >
              {tarefa.descricao}
            </Text>
            <View style={styles.tarefaButtons}>
              <Button
                title={tarefa.status ? "Desfazer" : "Concluir"}
                onPress={() => handleToggleTarefa(tarefa.id, tarefa.status)}
              />
              <Button
                title="Excluir"
                color="red"
                onPress={() => handleDeleteTarefa(tarefa.id)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  tarefa: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tarefaDescricao: {
    flex: 1,
    fontSize: 16,
  },
  tarefaConcluida: {
    textDecorationLine: "line-through",
  },
  tarefaButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
});
