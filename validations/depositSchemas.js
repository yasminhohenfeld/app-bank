const yup = require('./settings');

const depositSchema = yup.object().shape({
    valor: yup.number().required(),
    senha: yup.string().required()  
  });

module.exports = depositSchema
  