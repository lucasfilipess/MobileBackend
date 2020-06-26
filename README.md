# OmniStack-Backend

===> FERRAMENTAS

VSCode
Chocolatey
NodeJS
Express
Insomnia
Knex
SQLite

------------------------------------------------------ // ------------------------------------------------------

===> COMANDOS

npm => gerenciador de pacotes do node, já vem instalado com ele.
npx => executa um pacote ao invés de instala-lo.
npm int => Cria package.json do back.
npm express => Instala o express que é usado para as requisições.
node 'nome de arquivo' => roda a aplicação.
npm install nodemon -D => instala o nodemon em ambiente de desenvolvimento ja que não é necessário em produção.(Cria um scrip de start dentro do package.json para dar start no nodemon ja no arquivo raiz) ex:

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon index.js"
}

npm install knex

npm install pg
npm install sqlite3 < escolha o banco que vai usar
npm install mysql
npm install mysql2
npm install oracledb
npm install mssql

npx knex init => cria um arquivo knexfile.js onde vão ser feitas as configurações de conexão com o banco

npx knex migrate:make 'nome da migration' => cria minha migration

npx knex migrate:latest => executa a migration e cria ou altera a tabela(s) da migration

npm isntall cors => CORS é o módulo de segurança para que outros não consigam acessar nossa aplicação
------------------------------------------------------ // ------------------------------------------------------

===> ROTAS E METODOS HTTP

const express = require('express'); importa o express para as requisições dentro de uma const

const app = express(); Aqui eu "dou" ao app a possibilidade de usar as ferramentas do express

app.use(express.json()); Estou "falando" que as minhas requisições vão ser em formato JSON assimo express ja as converte nesse formato (deve vir antes das requisições)

const routes = express.Router(); =>Por exemplo aqui dou a variável routes o módulo de rotas do express

app -> const criada, .get é um atribulto do express para fazer requisições GET. '/' é a rora chamada de recurso e indica que o get vai ser feito na minha rota principal, se fosse '/nome' seria rota nome, (rota/recurso). Request guarda todos os dados que vêm da minha requisição o que é requirido e o response é mimha resposta ao request.

Métodos HTTP
GET: Buscar/listar uma informação do backend
POST: Criar alguma informação no backend
PUT: Alterar alguma informação no backend
DELETE: Deletar alguma informação no backend

Parâmetros:

Query Parms: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação) ex: /users?nome=lucas&idade=20, const params = request.query acesso as query que foram requisitadas

Route Parms: Parâmetros utilizados para identificar recursos ex: /users/:id e no meu get eu usar /users/1 retorna o usuário com id 1, '/users/:id' , const params = request.param acesso os parâmetros da rota

Request Body: Corpo da requisição, utilizado para criar ou alterar recursos, formato JSON por exemplo passado na requisição com os dados, para acessa-lo const body = request.body

Quando eu tenho algum dado cruzado com uma foreign key que depende do usuário estar logado, esse dado vai ser passado no header da requiseção, não no body do request, posso testar esse caso no insomnia passando um header como Authorization

------------------------------------------------------ // ------------------------------------------------------

===> DATABASE

npx para executar o pacote knex

SQL: MySQL, PostgreSQL, Oracle, SQL Server, SQLite
NoSQL: MongoDB, CouchDB

Formas de Conectar com DB

Driver: Usa o "pacote do banco" (SELECT nome FROM ...)

Query Builder: As query's são feitas em JavaScript (table('users').select('\*').where()...) => usando essa abordagem minha aplicação estará pronta para qulaquer banco SQL, possibilitando uma possível troca.

Query Builder: Knex.js
DB: SQLite

No arquivo knexfile.js eu tenho as minhas conexões com o banco, nos ambientes de dev, produção e outros, como so vou usar o de dev as minhas credenciais so estão config nele

development: {
client: 'sqlite3',
connection: {
filename: './src/database/db.sqlite'
}
},

Dica => Para pensar nas minhas tabelas do banco primeiro olho minhas entidades, depois as funcionalidades

Para criar as tabelas o knex tem a ferramenta de migrations, assim tem que configurar o knex.js para acessar as pastas de migrations

Depois de criar a migration para criar as tabelas e tudo mais olhar a documentação do knex

------------------------------------------------------ // ------------------------------------------------------

===> VALIDAÇÃO

Biblioteca chamada celebrate que integra o hapi/joi (outra biblioteca de autenticação) com o express

npm install celebrate

------------------------------------------------------ // ------------------------------------------------------

===> TESTES TDD (Desenvolvimento dirigido a testes)

Biblioteca chamada jest que permite fazer testes na aplicação (React, React Native, noode)

npm install jest -D

npx jest --init => colocar os testes no scrip, rodar no node ou no browser

Teste Unitário => testa uma função muito específica.
 
npm test => Para iniciar um teste, ele encontra o teste automaticamente na extensão nome.spec.js

criar uma nova conexão com o banco para fazer um bd de testes

npm install cross-env => fazer o banco identificar qual é o ambiente de teste 

vai no package. json e altera para quando for teste utilizar o banco de testes usando uma variavel de ambiente NODE_ENV

npm install supertest -D => biblioteca para requisições de teste (-D dependencia de desenvolvimento ja que não iremos usar para mais além disso )

------------------------------------------------------ // ------------------------------------------------------
