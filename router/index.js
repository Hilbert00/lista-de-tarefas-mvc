const router = require("express").Router();
const tarefaController = require("../controllers/tarefaController");

// Tela inicial
router.get("/", (_req, res) => res.render("startView"));

// Visualizar tarefas
router.get("/tarefas", tarefaController.getTarefas);

// Visualizar tarefa
router.get("/tarefa", tarefaController.getTarefa);

// Publicar tarefa
router.post("/tarefa", tarefaController.addTarefa);

// Atualizar tarefa
router.post("/tarefa/update", tarefaController.updateTarefa);

// Excluir tarefa
router.post("/tarefa/delete", tarefaController.deleteTarefa);

module.exports = router;