'use client'
import { useState } from "react"
import UsersList from "../components/UsersList"


export default function Home() {
  const [action, setAction] = useState('Listar')

  const changeAction = (newAction) => {
    setAction(newAction)
  }

  return (
    <main className="columns-12 flex h-screen bg-gray-300">
      <aside className="w-1/4 h-full flex flex-col justify-center gap-3 items-center shadow-[10px_0px_15px_0px_rgba(169,169,169,0.5)]">
        <button className={`hover:text-gray-400 hover:bg-blue-700  w-1/2 py-3 rounded text-xl font-bold ${action === 'Listar'?'bg-blue-700 text-gray-400 shadow-inner' : 'bg-blue-500 text-white'}`} onClick={() => changeAction('Listar')}>Listar</button>
        <button className={`hover:text-gray-400 hover:bg-yellow-700  w-1/2 py-3 rounded text-xl font-bold  ${action === 'Atualizar'?'bg-yellow-700 text-gray-400 shadow-inner' : 'bg-yellow-500 text-white'}`}onClick={() => changeAction('Atualizar')}>Atualizar</button>
        <button className={`hover:text-gray-400 hover:bg-red-700  w-1/2 py-3 rounded text-xl font-bold  ${action === 'Deletar'?'bg-red-700 text-gray-400 shadow-inner' : 'bg-red-500 text-white'}`} onClick={() => changeAction('Deletar')}>Deletar</button>
      </aside>
      <UsersList action={action}/>
    </main>
  )
}
