const Tarefa = require("../models/tarefaModel.js");
const Database = require("../models/databaseModel.js")

function getTarefas(req, res) {
    Database.query("SELECT * FROM tarefas;", (response) => {
        res.render("tarefaView", { tarefas: response });
    });
}

function getTarefa(req, res) {
    const { id } = req.query;
    
    if (!id) return res.sendStatus(404);

    Database.query(`SELECT * FROM tarefas WHERE idTarefa = ${id};`, (response) => {
        if (response.length) return res.render("editView", { tarefa: response[0] });
        return res.redirect("/tarefas");
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

async function deleteTarefa(req, res){
    const { id } = req.body;

    Database.query(
        `DELETE FROM tarefas WHERE idTarefa = ${id};`,
        (_response) => {
            res.redirect("/tarefas");
    });
}

async function updateTarefa(req, res){
    const { id, title, description } = req.body;
    const tarefa = new Tarefa(title, description);

    Database.query(
        `UPDATE tarefas SET title = '${tarefa.title}', description = '${tarefa.description}' WHERE idTarefa = ${id};`,
        (_response) => {
            res.redirect("/tarefas");
    });
}

module.exports = { getTarefas, getTarefa, addTarefa, deleteTarefa, updateTarefa };