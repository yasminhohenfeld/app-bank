const createTransferSchema = require('../validations/transferSchemas')
const knex = require('../connection');


const createTransfer = async (req, res) => {
    const id = req.user   
    const { id_conta_destino } = req.body

    try{
        await createTransferSchema.validate(req.body);

        const userFound = await knex('users').where("id", id_conta_destino).first();

        if (!userFound){
            return res.status(400).json("Conta de origem não existe, por favor insira um id válido!")
        } 

        const consultedBalance = await knex('users').where('id', id).first();

        if (consultedBalance.saldo < req.body.valor){
            return res.status(400).json("Saldo insuficiente para a transação")
        }

        const dataAtual = new Date(Date.now());

        const transactionData = {
                id_conta_origem: id,
                id_conta_destino: id_conta_destino,
                tipo: "transferencia",
                valor: req.body.valor,
                data: dataAtual
        }

        const insertTransaction = await knex('transactions').insert(transactionData); 

       
        const saldoAdicionadoContaDestino = userFound.saldo + req.body.valor
        await knex('users').update("saldo", saldoAdicionadoContaDestino).where('id', id_conta_destino);

        const saldoExtraidoContaOrigem = consultedBalance.saldo - req.body.valor
        await knex('users').update("saldo", saldoExtraidoContaOrigem).where('id', id);

        return res.status(200).send (`Operação concluida com sucesso! Valor de ${req.body.valor} transferido para conta de ${userFound.nome}`)
    }
    catch (error){
        return res.status(500).json(error.message)
    }
}

module.exports = createTransfer