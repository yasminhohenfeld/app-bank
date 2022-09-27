const knex = require('../connection');
const createTransactionSchema  = require('../validations/transactionSchemas');
const jwt = require('jsonwebtoken');
const createTransactionSchema = require('../validations/transactionSchemas')


const createTransaction = async (req, res) => {

    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

    const { id_conta_destino } = req.body

    try{
        await createTransactionSchema.validate(req.body);

        const userFound = await knex('users').where("id", id_conta_destino).first();

        if (!userFound){
            return res.status(400).json("Conta de origem não existe, por favor insira um id válido!")
        }

        const consultedBalance = await knex('users').where('id', id).first();

        if (consultedBalance.saldo < req.body.valor){
            return res.status(400).json("Saldo insuficiente para esta transação")
        }

        const dataAtual = new Date(Date.now());

        const transactionData = {
                id_conta_origem: id,
                id_conta_destino: id_conta_destino,
                descricao: req.body.descricao,
                valor: req.body.valor,
                data: dataAtual
        }

       const saldoAtualContaDestino = userFound.saldo + req.body.valor

       const insertTransaction = await knex('transactions').insert(transactionData); 
       const updateBalanceDestiny = await knex('users').update("saldo", saldoAtualContaDestino).where('id', id_conta_destino);

       const saldoAtualContaOrigem = consultedBalance.saldo - req.body.valor

       const updateBalanceOrigin = await knex('users').update("saldo", saldoAtualContaOrigem).where('id', id);

        return res.status(200).send (`Operação concluida com sucesso! Valor de ${req.body.valor} transferido para conta de ${userFound.nome}`)
    }
    catch (error){
        return res.status(500).json(error.message)
    }
}

const getTransactions = async (req, res) => {

    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

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

    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

    const idTransaction = parseInt(req.params.id)

    try{   
        const verifyId = isNaN(idTransaction)   
        if(verifyId === true){
            return res.status(400).json("Você deve enviar o id da transação que deseja consultar!")
        }

        const transaction = await knex('transactions').where("id", idTransaction).first();

        if ((transaction.id_conta_origem !== id) && (transaction.id_conta_destino !== id)){
            return res.status(400).json("O id dessa transação não pertence ao seu usuário")
        }

        return res.status(200).send(transaction); 

    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports =  {
    createTransaction,
    getTransactions,
    getTransactionsId
}