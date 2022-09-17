const express = require('express');
const routes = express();
const user = require('./control/user');
const login = require('./control/login')

routes.post("/user", user.createUser);
routes.post("/login", login);


routes.get("/user", user.getUser);
routes.patch("/user", user.updateUser);
routes.delete("/user", user.deleteUser);



module.exports = routes