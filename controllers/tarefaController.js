const Tarefa = require("../models/tarefaModel.js");
const Database = require("../models/databaseModel.js")

function getTarefas(req, res) {
    Database.query("SELECT * FROM tarefas;", (response) => {
        res.render("tarefaView", { tarefas: response });
    });
}

function addTarefa(req, res) {
    const { title, description } = req.body;
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    const dateString = `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const tarefa = new Tarefa(title, description, dateString);

    Database.query(
        `INSERT INTO tarefas (title, description, date) VALUES ('${tarefa.title}', '${tarefa.description}', '${tarefa.date}');`,
        (_response) => {
            res.redirect("/tarefas");
    });
}

module.exports = { getTarefas, addTarefa };