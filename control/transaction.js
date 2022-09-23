const knex = require('../connection');
const createTransactionSchema = require('../validations/transactionSchemas');
const jwt = require('jsonwebtoken');


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

    return res.send("Ok")
}

const getTransactionsId = async (req, res) => {
    return res.send("Ok")
}

module.exports =  {
    createTransaction,
    getTransactions,
    getTransactionsId
}