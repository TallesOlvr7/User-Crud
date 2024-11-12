import { useState } from "react"
import api from '../services/api/config'

export default function useAction(action) {
    let method
    const [message, setMessage] = useState(null)

    if(action == 'Deletar') {
        method = async (id) =>{
            try{
                const response = await api.delete(`/usuarios/${id}`)
                setMessage(response.data.message)
            } catch (error) {
                setMessage(error)
            }
        }
    }

    return {method, message}
}