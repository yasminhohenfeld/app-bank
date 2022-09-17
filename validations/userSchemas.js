const yup = require('./settings');

const registerUserSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    cpf: yup.string().required(),
    senha: yup.string().required()
  });

module.exports = {
    registerUserSchema
  }