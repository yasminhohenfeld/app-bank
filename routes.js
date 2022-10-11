const express = require('express');
const routes = express();
const user = require('./control/user');
const login = require('./control/login');
const verificaLogin = require('./middleware/verifyLogin');
const transaction = require('./control/transaction');
const transfer = require('./control/transfer')
const deposit  = require('./control/deposit');
const withdraw = require('./control/ withdraw');


routes.post("/user", user.createUser);
routes.post("/login", login);

routes.use(verificaLogin);
routes.get("/user", user.getUser);
routes.patch("/user", user.updateUser);

routes.post('/transfer', transfer);

routes.post('/saque', withdraw);

routes.post('/deposit', deposit)


routes.get('/extrato', transaction.getTransactions);
routes.get('/extrato/:id', transaction.getTransactionsId);






module.exports = routes