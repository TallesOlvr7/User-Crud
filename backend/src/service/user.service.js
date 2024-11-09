import User from "../entity/user.js";

class UserService {
    async findOne(id){
        const user = await User.findByPk(id)
        if(user){
            return user
        }
        throw new Error('Usuário não encontrado.')
    }

    async findByEmail(email) {
        const user = await User.findOne({ where: { email } })
    
        if (user) {
            throw new Error('O email já está em uso')
        }
    }

    async delete(id) {
        const user = await this.findOne(id)
        if (user) {
            await user.destroy()
            return true
        }
        throw new Error('Erro ao deletar usuário.')
    }

    async update(id, data) {
        const user = await this.findOne(id)
        if (user) {
            const updatedUser = await user.update(data)
            return updatedUser
        }
        throw new Error('Erro ao atualizar dados')
    }
}

export default new UserService()