import useAction from '../../hooks/useAction'
import api from '../../services/api/config'
import { useEffect, useState } from "react"
import DeleteUserModal from '../DeleteUserModal'
import UserInfoModal from '../UserInfoModal'
import UpdateUserForm from '../UpdateUserFormModal'

export default function UsersList({ action }) {
    const { method, message } = useAction(action)
    const [modalStatus, setModalStatus] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
    }, [modalStatus])

    function openModal(user) {
        setSelectedUser(user)
        setModalStatus(true)
    }

    function closeModal() {
        setModalStatus(false)
        setSelectedUser(null)
    }

    return (
        <div>
            {action}
            {error ? <p>Error: {error.message}</p> : null}
            {message ? <p>{message}</p> : null}

            {users && users.length > 0 && !loading ? (
                users.map(user => (
                    <div key={user.id} className="flex justify-between items-center p-4 border-b">
                        <p>{user.nome}</p>
                        <button
                            onClick={() => openModal(user)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
                        >
                            Abrir Modal
                        </button>
                    </div>
                ))
            ) : <p>Loading...</p>}

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
            {modalStatus && selectedUser && action == 'Atualizar'(
                <UpdateUserForm
                    user={selectedUser}
                    status={modalStatus}
                    closeModal={closeModal}
                    method={method}
                    action={action}
                />
            )}
        </div>
    )
}
