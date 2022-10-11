const knex = require('../connection');
const withdrawSchema = require('../validations/withdrawSchemas');
const bcrypt = require('bcrypt')


const withdraw = async (req, res) =>{
      
    const id = req.user 

    try{        
        await withdrawSchema.validate(req.body);

        const selectUser = await knex('users').where("id", id).first();

        const verifiedPassword = await bcrypt.compare(req.body.senha, selectUser.senha);

        if (verifiedPassword === false){
            return res.status(400).json("Senha incorreta!")
        }

        if (req.body.valor > selectUser.saldo){
            return res.status(400).json("Saldo insuficiente para saque!")
        }
    
        const saldoAtualDepoisDoSaque = selectUser.saldo - req.body.valor;
        const dadosParaTransacao = {
                id_conta_origem: id,
                id_conta_destino: id,
                tipo: "saque",
                valor: req.body.valor,
                data: new Date(Date.now())
        }

        const updatedBalance = await knex('users').update('saldo', saldoAtualDepoisDoSaque).where({ id });
        const createTransaction = await knex('transactions').insert(dadosParaTransacao)

        return res.status(200).json(`Saque de ${req.body.valor} realizado. Saldo atual: ${saldoAtualDepoisDoSaque}`)
    } catch (error){
        return res.status(500).json(error.message)
    }
   
}

module.exports = withdraw