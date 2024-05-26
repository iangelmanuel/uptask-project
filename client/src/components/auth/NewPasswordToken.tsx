import { validateToken } from '@/api/AuthAPI'
import { ConfirmToken } from '@/types'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type NewPasswordTokenProps = {
  token: ConfirmToken['token']
  setToken: Dispatch<SetStateAction<ConfirmToken['token']>>
  setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,

    onError: (error) => {
      toast.success(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
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
      <form className="mt-10 space-y-8 rounded-lg bg-white p-10">
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
          to="/auth/forgot-password"
          className="text-center font-normal text-gray-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}
