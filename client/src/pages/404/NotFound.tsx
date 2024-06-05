import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h1 className="text-center text-4xl font-black text-white">
        Página no encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez la página que buscas ha sido eliminada o no existe.
        <Link to="/" className="text-fuchsia-500 hover:underline">
          Regresar al inicio
        </Link>
      </p>
    </>
  )
}
