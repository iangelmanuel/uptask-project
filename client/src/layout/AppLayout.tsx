import { Outlet } from 'react-router-dom'

import { Logo } from '../components/Logo'

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between lg:flex-row">
          <div className="w-64">
            <Logo />
          </div>
        </div>
      </header>

      <main className="mx-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </main>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
