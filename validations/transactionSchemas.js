const yup = require('./settings');

const createTransactionSchema = yup.object().shape({
    id_conta_destino: yup.number().required(),
    descricao: yup.string().required(),
    valor: yup.number().required()   
  });

module.exports = createTransactionSchema