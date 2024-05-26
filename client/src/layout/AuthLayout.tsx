import { Logo } from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-800">
        <div className="mx-auto w-[450px] py-10 lg:py-20">
          <Logo />

          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
