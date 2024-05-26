import { confirmAccount } from '@/api/AuthAPI'
import { ConfirmToken } from '@/types'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')

  const { mutate } = useMutation({
    mutationFn: confirmAccount,

    onError: (error: Error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ConfirmToken['token']) => {
    mutate({ token })
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Confirma tu Cuenta
      </h1>
      <p className="mt-5 text-2xl font-light text-white">
        Ingresa el código que recibiste {''}
        <span className=" font-bold text-fuchsia-500"> por e-mail</span>
      </p>
      <form className="mt-10 space-y-8 bg-white p-10">
        <label className="block text-center text-2xl font-normal">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center font-normal text-gray-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}
