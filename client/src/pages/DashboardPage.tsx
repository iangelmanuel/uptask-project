import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="mt-5 text-2xl font-light text-gray-500">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-5">
        <Link
          to="/projects/create"
          className="mt-5 cursor-pointer rounded-md bg-purple-400 px-5 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-purple-500"
        >
          Crear Proyecto
        </Link>
      </nav>
    </>
  )
}
