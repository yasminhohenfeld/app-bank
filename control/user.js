const knex = require('../connection');
const { registerUserSchema } = require('../validations/userSchemas')


const createUser = async (req, res) => {
    try {
        
    await registerUserSchema.validate(req.body);

    return res.send("Rota ok")
    } catch (error){
        return res.status(500).json(error.message)
    }
}

const getUser = async (req, res) => {
    return res.send("Rota ok")
}

const updateUser = async (req, res) => {
    return res.send("Rota ok")
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