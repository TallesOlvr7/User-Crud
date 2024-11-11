import User from "../entity/user.js"
import userService from "../service/user.service.js"

class UserController {

    async index(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json({
                error: e.message
            })
        }
    }

    async create(req, res) {
        try {
            const { nome, email, telefone, dataNascimento } = req.body
            await userService.findByEmail(email)
            const user = await User.create({
                nome,
                email,
                telefone,
                dataNascimento
            })
            return res.status(201).json(user)
        } catch (e) {
            let errors = []
            
            if (e.name === 'SequelizeValidationError') {
                errors = e.errors.map(error => error.message)
            }

            if (e.message === 'O email já está em uso') {
                errors.push(e.message)
            }

            return res.status(400).json({
                error: errors
            })
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id
            const user = await userService.findOne(id)

            if (!user) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                })
            }
            return res.status(200).json(user)
        } catch (e) {
            return res.status(400).json({
                error: e.message
            })
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const result = await userService.delete(id)

            if (result) {
                return res.status(200).json({
                    message: 'Usuário deletado com sucesso.'
                })
            }


        } catch (e) {
            return res.status(500).json({
                error: e.message || "Erro interno ao tentar deletar o usuário"
            })
        }
    }

    async update(req, res) {
        const data = req.body
        try {
            const id = req.params.id
            const user = await userService.update(id, data)

            if (!user) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                })
            }

            return res.status(200).json({
                data: user
            })
        } catch (e) {

            const errors = e.errors ? e.errors.map(error => error.message) : [e.message]
            return res.status(400).json({
                error: errors
            })
        }
    }
}

export default new UserController()
