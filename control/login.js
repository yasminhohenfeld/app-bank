const knex = require('../connection');

const login = async (req, res) => {
    try{

        return res.json ("Ok com login")
    } catch (error){
        return res.status(500).json(error.message)
    }
}

module.exports = login