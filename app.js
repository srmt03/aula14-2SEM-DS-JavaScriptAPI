//Import da biblioteca do express para criar a API
const express = require('express');
const { request, response } = require('express');
//Import da biblioteca do cors para manipullar as permissoes do http
const cors = require('cors')
//Importbda biblioteca do body-parser que ira manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//Cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
//Import de arquivos de functions do projeto 
const { getListBooks } = require('./module/livros.js')

app.use((request, response, next) => {
    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos ou metodos qur a API ira reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());
    
    next();
});

//EndPoint para Listar livros por uma palavra chave 
app.get('/livros/:keyword', cors(), async function (request, response, next) {
    //Recebe a sigla enviada por parametro no endPoint 
    let palavraChave = request.params.keyword;
    //Chama a funcao que vai localizar os livros solicitado com base na palavra chave
    let books = getListBooks(palavraChave);
    if (books) 
    {
        response.status(200);
        response.json(books);
    } else 
        response.status(404);
}); -
//EndPoint para Filtrar Livros 
app.get('/livros/', cors(), async function (request, response, next) {
    //Recebe a variavel nome por QueryStrings(indicada quando precisamos criar filtros)
    let nomeLivro = request.query.nome;

    //Chama a funcao que vai localizar os livros solicitado com base na palavra chave
    let books = getListBooks(nomeLivro);
    if (books) 
    {
        response.status(200);
        response.json(books);
    } else 
        response.status(404);
})

//Para que os endPoins possam estar funcionando obrigatoriamente finalizar 
//a API com essa function que representa o start da API
app.listen(3030, function () {
    console.log('Servidor aguardando requisicoes.');
});
