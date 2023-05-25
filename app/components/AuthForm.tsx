"use client"

import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"
import Button from "./Button"
import AuthGoogleButton from "./AuthSocialButton"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session?.status, router])
  
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "REGISTER") {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      .catch(() => toast.error('Algo ha ido mal!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if(callback?.error){
          toast.error('Credenciales Incorrectas')
        }

        if(callback?.ok && !callback?.error){
          toast.success('Sesion Iniciada!')
          router.push('/dashboard')
          router.refresh()
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)

    await signIn(action, {redirect: false})
    .then((callback) => {
      if(callback?.error){
        toast.error('Credenciales Incorrectas')
      }

      if(callback?.ok && !callback?.error){
        toast.success('Sesion Iniciada!')
        router.push('/dashboard')
      }
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="bg-white px-4 py-8 shadow
            sm:rounded-lg sm:px-10"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
              required={true}
            />
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required={true}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            required={true}
          />

          <div>
            <Button disabled={isLoading} type="submit">
                {variant === 'LOGIN' ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <AuthGoogleButton onClick={() => socialAction('google')}/>
            </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2
        text-gray-500">
            <div>
                {variant === 'LOGIN' ? 'No tienes una cuenta?' : 'Ya tienes una cuenta?'}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
                {variant === 'LOGIN' ? 'Crea una cuenta' : 'Inicia Sesión'}
            </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
