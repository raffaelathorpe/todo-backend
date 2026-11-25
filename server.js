const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB (local)
mongoose.connect('mongodb+srv://raffaela:396610@cluster0.qpxx4gq.mongodb.net/todoDB?retryWrites=true&w=majority')  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Modelo da Tarefa
const Tarefa = mongoose.model('Tarefa', {
  titulo: String,
  concluida: Boolean
});

// CREATE
app.post('/tarefas', async (req, res) => {
  const tarefa = new Tarefa(req.body);
  await tarefa.save();
  res.status(201).json(tarefa);
});

// READ (Listar todas)
app.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

// UPDATE
app.put('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tarefa);
});

// DELETE
app.delete('/tarefas/:id', async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tarefa deletada' });
});

// Inicia o servidor (0.0.0.0 permite acesso externo [citation:6])
app.listen(5000, '0.0.0.0', () => console.log('Servidor rodando na porta 5000'));