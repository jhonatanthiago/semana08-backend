// Importando as bibliotecas necessárias...
const express = require('express'); // Importa o Express, que é uma biblioteca para criar aplicativos web em Node.js.
const Ajv = require('ajv'); // Importa o Ajv, que é uma biblioteca para validar dados em JavaScript.
const addFormats = require('ajv-formats'); // Importa uma extensão do Ajv para validar formatos específicos de dados.
const ajv = new Ajv(); // Inicializa o Ajv.

// Inicializa o Express.
const app = express();

// Configura o Express para entender dados no formato JSON.
app.use(express.json());

// Define a porta em que o servidor vai rodar.
const port = 3000;

// Variável para rastrear o ID dos usuários.
let id = 0;

// Array para armazenar os usuários.
const users = [];

// Define um esquema (um conjunto de regras) para validar os dados dos usuários.
const userSchema = {
    type: "object", // Os dados devem ser objetos.
    properties: {
        name: { type: "string" }, // O nome deve ser uma string.
        email: { type: "string", format: "email" }, // O email deve ser uma string no formato de email.
        password: { type: "string" } // A senha deve ser uma string.
    },
    required: ["name", "email", "password"], // Esses campos são obrigatórios.
    additionalProperties: false // Não permite campos adicionais que não estejam no esquema.
}

// Função para validar os dados de um usuário.
const validateUser = (req, res, next) => {
    const user = req.body; // Obtém os dados do usuário do corpo da requisição.
    const validate = ajv.compile(userSchema); // Prepara a validação com base no esquema.
    const valid = validate(user); // Executa a validação.
    if (valid) {
        next(); // Se os dados são válidos, passa para a próxima função.
    } else {
        res.status(400).json({ msg: "Dados inválidos", errors: validate.errors }); // Se os dados são inválidos, retorna um erro 400 com informações sobre o erro.
    }
}

// Rota para obter a lista de usuários (GET).
app.get('/users', (req, res) => {
    res.json({ users: users }); // Retorna a lista de usuários em formato JSON.
});

// Rota para adicionar um novo usuário (POST) com validação usando a função validateUser.
app.post('/users', validateUser, (req, res) => {
    const user = req.body; // Obtém os dados do usuário do corpo da requisição.
    user.id = ++id; // Atribui um ID único ao usuário.
    users.push(user); // Adiciona o usuário à lista.
    res.json({ msg: "Usuário adicionado com sucesso." }); // Retorna uma mensagem de sucesso em formato JSON.
});

// Inicia o servidor na porta especificada e exibe uma mensagem no console.
app.listen(port, () => {
    console.log(`Servidor está funcionando na porta: ${port}`);
});