'use client'
import { useState, useRef } from "react"
import UsersList from "../components/UsersList"
import RegisterUser from "../components/RegisterUser"
import { Toast } from "primereact/toast"


export default function Home() {
  const [action, setAction] = useState('Listar')
  const toast = useRef(null)
  const [successAction, setSuccessAction] = useState(false)

  const changeSuccessAction = () => {
    setSuccessAction(false)
  }

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

  const changeAction = (newAction) => {
    setAction(newAction)
    setSuccessAction(false)
  }

  return (
    <main className="columns-12 flex h-screen bg-gray-300">
      <Toast ref={toast} />
      <aside className="w-1/4 h-full flex flex-col justify-center gap-3 items-center shadow-[10px_0px_15px_0px_rgba(169,169,169,0.5)]">
        <button className={`hover:text-gray-400 hover:bg-blue-700  w-1/2 py-3 rounded text-xl font-bold ${action === 'Listar' ? 'bg-blue-700 text-gray-400 shadow-inner' : 'bg-blue-500 text-white'}`} onClick={() => changeAction('Listar')}>Listar</button>
        <button className={`hover:text-gray-400 hover:bg-green-700  w-1/2 py-3 rounded text-xl font-bold  ${action === 'Registrar' ? 'bg-green-700 text-gray-400 shadow-inner' : 'bg-green-500 text-white'}`} onClick={() => changeAction('Registrar')}>Registrar</button>
        <button className={`hover:text-gray-400 hover:bg-yellow-700  w-1/2 py-3 rounded text-xl font-bold  ${action === 'Atualizar' ? 'bg-yellow-700 text-gray-400 shadow-inner' : 'bg-yellow-500 text-white'}`} onClick={() => changeAction('Atualizar')}>Atualizar</button>
        <button className={`hover:text-gray-400 hover:bg-red-700  w-1/2 py-3 rounded text-xl font-bold  ${action === 'Deletar' ? 'bg-red-700 text-gray-400 shadow-inner' : 'bg-red-500 text-white'}`} onClick={() => changeAction('Deletar')}>Deletar</button>
      </aside>
      {
        action != 'Registrar' ? (
          <UsersList 
          action={action}
          showSuccess={showSuccess}
          successAction={successAction}
          changeSuccessAction={changeSuccessAction}
          handleToast={handleToast}
          />
        ) : (
          <RegisterUser 
          showSuccess={showSuccess}
          successAction={successAction}
          changeSuccessAction={changeSuccessAction}
          handleToast={handleToast}
          />
        )
      }
    </main>
  )
}
