import useAction from '../../hooks/useAction'
import { Toast } from "primereact/toast"
import api from '../../services/api/config'
import { useEffect, useState, useRef } from "react"
import DeleteUserModal from '../DeleteUserModal'
import UserInfoModal from '../UserInfoModal'
import UpdateUserForm from '../UpdateUserFormModal'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { set } from 'react-hook-form'

export default function UsersList({ action }) {
    const { method, message } = useAction(action)
    const [successAction, setSuccessAction] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const toast = useRef(null)

    const showSuccess = (successAction) => {
        if (toast.current && successAction) {
            if (action == 'Atualizar') {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Usuário atualizado com sucesso',
                })
            }

            if (action == 'Registrar') {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Usuário registrado com sucesso',
                });
            }

            if (action == 'Deletar') {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Usuário deletado com sucesso',
                });
            }
        }
    }
    function handleToast() {
        setSuccessAction(true)
    }


    async function getUsers() {
        try {
            const response = await api.get('/usuarios')
            setUsers(response.data)
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        getUsers()
        showSuccess(successAction)
    }, [modalStatus])


    function openModal(user) {
        setSuccessAction(false)
        setSelectedUser(user)
        setModalStatus(true)
    }

    function closeModal() {
        setModalStatus(false)
        setSelectedUser(null)
    }

    return (
        <div className='w-full flex flex-col pt-5'>
            <div className='w-4/5 py-3 text-center felx flex-col justify-center'>
                <h1 className={`text-3xl font-bold
                ${action == 'Listar' ? 'text-blue-500' : null}
                ${action == 'Deletar' ? 'text-red-500' : null}
                ${action == 'Atualizar' ? 'text-yellow-500' : null}`}> {action} usuários</h1>
            </div>
            <Toast ref={toast} />
            {error ? <p>Error: {error.message}</p> : null}
            {message ? <p>{message}</p> : null}


            <div className='w-4/5 overflow-auto ps-16'>
                {users && users.length > 0 && !loading ? (
                    users.map(user => (
                        <div key={user.id} className="flex items-center p-4 border-b justify-between">
                            <div className='flex items-center cursor-pointer w-full justify-between'  onClick={() => openModal(user)}>
                                <div className='flex items-center '>
                                    <figure className='w-12'>
                                        <UserCircleIcon />
                                    </figure>
                                    <p className=' px-5 text-xl'>{user.nome}</p>
                                </div>
                                <p className='text-gray-400 '>
                                    {action == 'Deletar' ? 'Clique para deletar usuário' : null}
                                    {action == 'Atualizar' ? 'Clique para atualizar informações do usuário' : null}
                                    {action == 'Listar' ? 'Clique para ver informações do usuário' : null}
                                </p>
                            </div>
                        </div>
                    ))
                ) : <p>Loading...</p>}
            </div>


            {modalStatus && selectedUser && action == 'Deletar' && (
                <DeleteUserModal
                    user={selectedUser}
                    status={modalStatus}
                    closeModal={closeModal}
                    method={method}
                    action={action} />
            )}
            {modalStatus && selectedUser && action == 'Listar' && (
                <UserInfoModal
                    user={selectedUser}
                    status={modalStatus}
                    closeModal={closeModal}
                    method={method}
                    action={action}
                />
            )}
            {modalStatus && selectedUser && action == 'Atualizar' && (
                <UpdateUserForm
                    user={selectedUser}
                    status={modalStatus}
                    closeModal={closeModal}
                    action={action}
                    handleToast={handleToast}
                />
            )}
        </div>
    )
}
