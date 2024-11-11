import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            args: true,
            msg: 'O email já está em uso' 
        },

        validate: {
            isEmail: {
                msg: 'O email fornecido não é válido'
            }
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Data de nascimento deve ser uma data válida',
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'users'
})

export default User