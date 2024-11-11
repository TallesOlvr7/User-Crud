import { useState } from "react"
import api from '../services/api/config'

export default function useAction(action) {
    let method
    const [message, setMesage] = useState(null)

    if(action == 'Deletar') {
        method = async (id) =>{
            try{
                const response = await api.delete(`/usuarios/${id}`)
                console.log(response.data)
                setMesage(response.data.message)
            } catch (error) {
                setMesage(error)
            }
        }
    }

    if(action == 'Atualizar'){

    }

    return {method, message}
}