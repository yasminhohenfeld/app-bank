const knex = require('../connection');


const getTransactions = async (req, res) => {

    const id = req.user 

    try{
        const userFoundOrigin = await knex('transactions').where("id_conta_origem", id,);
        const userFoundDestiny = await knex('transactions').where("id_conta_destino", id,);

        return res.status(200).send({
            Transações_enviadas: userFoundOrigin,
            Transações_recebidas: userFoundDestiny
        })
    }catch (error){
        return res.status(500).json (error.message)
    }
    
}

const getTransactionsId = async (req, res) => {

    const id = req.user 
    const idTransaction = parseInt(req.params.id)

    try{   
        const verifyId = isNaN(idTransaction)

        if(verifyId === true){
            return res.status(400).json("Você deve enviar o id da transação que deseja consultar!")
        }

        const transaction = await knex('transactions').where("id", idTransaction).first();

        if (transaction === undefined){
            return res.status(400).json ("Transação não encontrada")
        }

        if ((transaction.id_conta_origem !== id) && (transaction.id_conta_destino !== id)){
            return res.status(400).json("O id dessa transação não pertence ao seu usuário")
        }

        return res.status(200).send(transaction); 

    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports =  {
    getTransactions,
    getTransactionsId
}