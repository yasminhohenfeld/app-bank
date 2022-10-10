const express = require('express');
const routes = express();
const user = require('./control/user');
const login = require('./control/login');
const verificaLogin = require('./middleware/verifyLogin');
const transaction = require('./control/transaction');
const transfer = require('./control/transfer')
const deposit  = require('./control/deposit');


routes.post("/user", user.createUser);
routes.post("/login", login);

routes.use(verificaLogin);
routes.get("/user", user.getUser);
routes.patch("/user", user.updateUser);

routes.post('/transfer', transfer);
routes.get('/transactions', transaction.getTransactions);
routes.get('/transaction/:id', transaction.getTransactionsId);

routes.post('/deposit', deposit)




module.exports = routes