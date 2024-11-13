import { useState } from "react"
import { useForm } from "react-hook-form"
import { InputMask } from 'primereact/inputmask'
import api from "@/app/services/api/config"
export default function RegisterUser({ showSuccess, successAction, changeSuccessAction, handleToast }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/usuarios`, data)
            setMessage('Usuário registrado com sucesso')
            handleToast()
            showSuccess(true)
        } catch (error) {
            setMessage(error.response.data.error)
            setIsError(true)
        }
    }
    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 shadow flex flex-col items-center">
                <h1 className="text-3xl text-center font-bold mt-5">
                    Registrar usuário
                </h1>
                {isError ? (
                    (typeof (message) != 'string' ? (
                        message.map(error => (
                            <p key={error} className="text-red-500 text-xl pt-3">{error}</p>
                        ))
                    ) : <p className="text-red-500 text-sm">{message}</p>)
                ) : null}
                <form onSubmit={handleSubmit(onSubmit)} className="py-5 flex flex-col justify-center gap-3 w-1/2">
                    <div className="flex w-full gap-1 justify-center flex-col">
                        <div className="pt-3 flex flex-col gap-1">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                {...register('nome', {
                                    required: 'Nome é obrigatório',
                                    maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
                                })}
                                className="py-1 px-2 bg-gray-400 rounded focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                        </div>

                        <div className="pt-3 flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: 'Email é obrigatório',
                                    maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
                                })}
                                className="py-1 px-2 bg-gray-400 rounded focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>


                        <div className="pt-3 flex flex-col gap-1">
                            <label htmlFor="telefone">Telefone</label>

                            <InputMask
                                mask="(99) 99999-9999" placeholder="(99)99999-9999"
                                type="text"
                                id="telefone"
                                {...register('telefone', {
                                    pattern: { value: /^\(\d{2}\) \d{5}-\d{4}$/, message: 'Telefone inválido' }
                                })}
                                className="py-1 px-2 bg-gray-400 rounded focus:outline-none focus:ring-0 focus:border-transparent"
                                
                            />
                                {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
                        </div>

                        <div className="pt-3 flex flex-col gap-1">
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                {...register('dataNascimento', {
                                    required: 'Data de Nascimento é obrigatória'
                                })}
                                className="py-1 px-2 bg-gray-400 rounded focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                            {errors.dataNascimento && <p className="text-red-500 text-sm">{errors.dataNascimento.message}</p>}
                        </div>

                        <div className="pt-3 flex w-full justify-center">
                            <input
                                severity="success"
                                type="submit"
                                value="Registar"
                                className="text-xl cursor-pointer bg-green-500 text-white py-3 px-10 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}