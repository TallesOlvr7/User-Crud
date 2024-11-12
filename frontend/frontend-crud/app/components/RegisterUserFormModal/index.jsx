import { useForm } from "react-hook-form"
import { useState, useEffect, useRef } from "react"
import api from '@/app/services/api/config'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function RegisterUserFormModal({status, closeModal, handleToast}) {
    const [open, setOpen] = useState(status)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState(null)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/usuarios`, data)
            setMessage('Usuário registrado com sucesso')
            handleToast()
            closeModal()
        } catch (error) {
            setMessage(error.response.data.error)
            setIsError(true)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={() => {
                setOpen(false)
                closeModal()
            }} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex-col justify-center sm:flex sm:items-start w-full">
                                    <div className='w-full flex justify-center items-center flex-col'>
                                        <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <UserCircleIcon />
                                        </div>

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex flex-col justify-center">
                                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                Registrar usuário
                                            </DialogTitle>
                                            <div className="mt-2 flex flex-col w-full text-center">
                                                {isError ? (
                                                    (typeof (message) != 'string' ? (
                                                        message.map(error => (
                                                            <p key={error} className="text-red-500 text-sm">{error}</p>
                                                        ))
                                                    ) : <p className="text-red-500 text-sm">{message}</p>)
                                                ) : null}
                                                <form onSubmit={handleSubmit(onSubmit)} className="py-5 flex flex-col justify-center gap-3">
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
                                                        <input
                                                            type="text"
                                                            id="telefone"
                                                            {...register('telefone', {
                                                                pattern: { value: /^\(\d{2}\) \d{5}-\d{4}$/, message: 'Telefone inválido' }
                                                            })}
                                                            className="py-1 px-2 bg-gray-400 rounded focus:outline-none focus:ring-0 focus:border-transparent"
                                                            placeholder="(XX) XXXXX-XXXX"
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
                                                            value="Registrar"
                                                            className="cursor-pointer bg-green-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}