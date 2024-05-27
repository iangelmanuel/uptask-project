import { User } from '@/types'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

interface NavMenuProps {
  user: User
}

export default function NavMenu({ user }: NavMenuProps) {
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 rounded-lg bg-purple-400 p-1 text-sm font-semibold leading-6">
        <Bars3Icon className="h-8 w-8 text-white " />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen -translate-x-1/2 lg:max-w-min lg:-translate-x-48">
          <div className="w-full shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 lg:w-56">
            <p className="text-center">Hola: {user.name}</p>
            <Link
              to="/profile"
              className="block p-2 hover:text-purple-950"
            >
              Mi Perfil
            </Link>
            <Link to="/" className="block p-2 hover:text-purple-950">
              Mis Proyectos
            </Link>
            <button
              className="block p-2 hover:text-purple-950"
              type="button"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
