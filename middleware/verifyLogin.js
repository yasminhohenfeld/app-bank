const jwt = require('jsonwebtoken');
const knex = require('../connection');

const verificaLogin = async (req, res, next) => {

    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json('Não autorizado');
    }
  
    try {
      const token = authorization.replace('Bearer ', '').trim();
  
      const { id } = jwt.verify(token, hash);
  
      const userFound = await knex('users').where({ id }).first();
  
      if (!userFound) {
        return res.status(404).json('Usuário não encontrado');
      }
  
      const { senha, ...user } = userFound;
  
      req.user = user;
  
      next();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  
  module.exports = verificaLogin;