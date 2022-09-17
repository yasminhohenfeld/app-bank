const knex = require('../connection');
const loginSchema = require('..')

const login = async (req, res) => {
    const { email, senha } = req.body
    try{


        const token = jwt.sign({ id: user.id }, hash, { expiresIn: '8h' });
        return res.json ("Ok com login")
    } catch (error){
        return res.status(500).json(error.message)
    }
}

module.exports = login