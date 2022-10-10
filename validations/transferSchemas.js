const yup = require('./settings');

const createTransferSchema = yup.object().shape({
    id_conta_destino: yup.number().required(),
    valor: yup.number().required()    
  });



module.exports = createTransferSchema
