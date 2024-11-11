'use client'
import { useState } from "react"
import UsersList from "../components/UsersList"


export default function Home() {
  const [action, setAction] = useState('Listar')

  const changeAction = (newAction) => {
    setAction(newAction)
  }

  return (
    <main className="columns-12 flex h-screen">
      <aside className="w-1/4 h-full flex flex-col">
        <button onClick={() => changeAction('Listar')}>Listar</button>
        <button onClick={() => changeAction('Atualizar')}>Atualizar</button>
        <button onClick={() => changeAction('Deletar')}>Deletar</button>
      </aside>
      <UsersList action={action}/>
    </main>
  )
}
