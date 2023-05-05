const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'db1_curriculo.db';
var bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
var db = new sqlite3.Database(DBPATH);


app.use(express.json());
app.get('/formacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var slq = "SELECT * FROM Pessoa";
    db.all(slq, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        res.send(rows);
    });
    //db.close();
});

app.post("/criar", (req, res) => {
    //res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("body"+req.body);
    var nome = req.body.Nome;         // precisa usar o postman para enviar as informações pelo body
    var id = parseInt(req.body.Id);
    var sql = `INSERT INTO Pessoa (Nome,Id) VALUES ("${nome}","${id}")`;
    db.all(sql, [], (err,rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Registro criado com sucesso!");
        res.send("Registro criado com sucesso!");
    });
    //db.close();
});

app.get('/atualiza', (req, res) => {
    res.statusCode = 200;
    var id = parseInt(req.query.Id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = "SELECT * FROM Pessoa WHERE Nome="+id;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        res.json(rows);
    });
    //db.close();
});

app.put("/atualiza",urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var nome = req.body.Nome;
    var sql = "UPDATE Pessoa SET Nome="+nome;
    db.run(sql, [], (err,rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.end()
        console.log("Registro atualizado com sucesso!",rows);
        res.send("Registro atualizado com sucesso!");
        res.end()
    });
    //db.close();
});


app.get('/deleta', (req, res) => {
    res.statusCode = 200;
    var id = parseInt(req.body.Id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = "DELETE FROM Pessoa WHERE Id ="+id;
    db.run(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        res.json(rows);
    });
    //db.close();
});








app.listen(port, hostname, () => {
    console.log('Servidor rodando em http://' + hostname + ':' + port);
});