'use client'

import { IconFolderPlus } from '@tabler/icons-react'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface CreateFormProp {
  toggleModal: () => void
  formType: string
}
const CreateForm = ({ toggleModal, formType }: CreateFormProp) => {

  const { register, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      description: '',
      amount: 0
    }
  })

  const router = useRouter()
  const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        axios.post(`/api/${formType}`, data)
        .then(res => {
          startTransition(() => {
            router.refresh()
          })
          toggleModal()
        })
        .catch(error => {
          console.log(error)
        })
    }

  return (
    <div className='mt-4 px-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col gap-4"
      >
        <div className="relative z-0 w-full mb-6 group">
          <input type="text" {...register("description", { required: true })} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 
          border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
          -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Descripción
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group ">
          <input type="number" {...register("amount", { required: true })} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 
          border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
          -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Coste Total
          </label>
        </div>
       
        <button
          type="submit"
          className="font-sans font-bold text-sm rounded-lg py-3 
            flex items-center gap-4 px-4 hover:bg-slate-500
            transition-all bg-[#234388] text-white mx-auto w-3/6"
        >
          <IconFolderPlus size={15} />
          CREAR {formType.toUpperCase()}
        </button>
      </form>
    </div>
  )
}

export default CreateForm
