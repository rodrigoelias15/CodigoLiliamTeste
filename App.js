// Carrega banco de dados

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rodrigo',
  password: '123',
  database: 'formulario_crud'
})

connection.connect()


// Carrega servidor

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);


app.use(express.json());

// Rota para adicionar um produto
app.post('/adicionar-produto', (req, res) => {
  const nomeProduto = req.body.nomeProduto;
  const precoProduto = req.body.precoProduto;
  const produtoDisponivel = req.body.produtoDisponivel;

  const sql = `INSERT INTO mercadoria (nome, preco, disponivel) VALUES (?, ?, ?)`;
  const values = [nomeProduto, precoProduto, produtoDisponivel];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao adicionar o produto:', error);
      res.status(500).send('Erro ao adicionar o produto');
    } else {
      res.send('Produto adicionado com sucesso');
    }
  });
});
