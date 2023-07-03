const router = require("express").Router();
const tarefaController = require("../controllers/tarefaController");

router.get("/", (_req, res) => res.send("<h1>Lista de Tarefas</h1>"));
router.get("/tarefas", tarefaController.getTarefas);
router.post("/tarefa", tarefaController.addTarefa);

module.exports = router;