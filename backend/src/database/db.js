import { Sequelize } from "sequelize"
import config from "../config/dbConfig.js"

const sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    logging: false
})

async function connect() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error)
    }
}

connect()

export default sequelize