const yup = require('./settings');

const withdrawSchema = yup.object().shape({
    valor: yup.number().required(),
    senha: yup.string().required()  
  });

module.exports = withdrawSchema
  