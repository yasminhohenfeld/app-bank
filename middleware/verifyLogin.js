const jwt = require('jsonwebtoken');
const knex = require('../connection');


const verificaLogin = async (req, res, next) => {

    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json('Não autorizado');
    }
    try {
     
      const token = authorization.replace('Bearer ', '').trim();

      const { id } = jwt.verify(token, "yamin");
      
  
      const userFound = await knex('users').where({ id }).first();

      req.user = userFound.id
  
      if (!userFound) {
        return res.status(404).json('Usuário não encontrado');

      }
      next();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  
  module.exports = verificaLogin;