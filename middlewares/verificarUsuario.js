function verificarUsuario(req, res, next) {
    if (
        req?.session?.user ||
        req.originalUrl === "/login" ||
        req.originalUrl === "/cadastro"
    )
        next();
    else res.redirect("/login");
}

module.exports = verificarUsuario;
