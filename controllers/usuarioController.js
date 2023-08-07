const Usuario = require("../models/usuarioModel.js");

async function autenticarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) return res.sendStatus(404);

    Usuario.autenticar(username, password);

    res.redirect("/tarefas");
}

function cadastrarUsuario(req, res) {
    const { email, username, password } = req.body;

    if (!username || !password || !email) return res.sendStatus(404);

    Usuario.cadastrar(email, username, password);

    res.redirect("/tarefas");
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
};