const Database = require("./databaseModel");
const md5 = require("md5");

class Usuario {
    constructor(username) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static autenticar(username, password, callback) {
        Database.query(
            `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${md5(
                password
            )}';`,
            (response) => {
                const data = JSON.parse(JSON.stringify(response));

                if (!data.length) return callback({});
                return callback(data[0]);
            }
        );
    }

    static cadastrar(email, username, password) {
        Database.query(
            `INSERT INTO usuarios (email, username, password) VALUES ('${email}', '${username}', '${md5(
                password
            )}');`
        );
    }
}

module.exports = Usuario;
