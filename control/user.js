const knex = require('../connection');
const { registerUserSchema } = require('../validations/userSchemas');
const { updateUserSchema } = require('../validations/userSchemas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    const { nome, email, senha, cpf } = req.body
    try {
        await registerUserSchema.validate(req.body)
    
        const selectUser = await knex('users').where('email', email).first();

        if(selectUser !== undefined){
            return res.status(400).json("Este email já está cadastrado no banco")
        }

        const passwordEncrypted = await bcrypt.hash(senha, 10);

        const userData = {
            nome, email, senha: passwordEncrypted, cpf, saldo: 0
        }

        const insertUser = await knex('users').insert(userData);

        return res.status(200).json(`Bem-vindo ${nome}, cadastrado com sucesso!!`)

    return res.send("Rota ok")
    } catch (error){

        return res.status(500).json(error.message)
    }
}

const getUser = async (req, res) => {

    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

    try{
        const selectUser = await knex('users').where('id', id).first();    
        return res.status(200).send({
            id: selectUser.id,
            nome: selectUser.nome,
            email: selectUser.email,
            cpf: selectUser.cpf,
            saldo: selectUser.saldo
        })
    } catch (error){
        return res.status(500).json(error.message)
    }
    
}

const updateUser = async (req, res) => {

    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

    let { nome, email, senha, cpf } = req.body

    try {
        updateUserSchema.validate()
        const selectUser = await knex('users').where('id', id).first();  

        const emailFound =  await knex('users').where('email', email).first(); 

        if((selectUser.email !== email) && (emailFound !== undefined)){
            return res.status(400).json("Já existe um usuário com este email!")
        }

        const cpfFound =  await knex('users').where('cpf', cpf).first();       
        if((selectUser.cpf !== cpf) && (cpfFound !== undefined)){
            return res.status(400).json("Já existe um usuário com este cpf!")
        }
    
        if (senha !== null && senha !== undefined){
            const passwordEncrypted = await bcrypt.hash(senha, 10);
            req.body.senha = passwordEncrypted
        }

        const userData = {
            ...selectUser,
            ...req.body
        }

        const updateTheUser = await knex('users').update(userData).where({ id })
  
        return res.status(200).send("Usuário atualizado com sucesso!")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    return res.send("Rota ok")

      

}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}