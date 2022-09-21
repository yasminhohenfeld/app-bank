const express = require('express');
const routes = express();
const user = require('./control/user');
const login = require('./control/login')
const verificaLogin = require('./middleware/verifyLogin')


routes.post("/user", user.createUser);
routes.post("/login", login);

routes.use(verificaLogin);
routes.get("/user", user.getUser);
routes.patch("/user", user.updateUser);
routes.delete("/user", user.deleteUser);



module.exports = routes