'use client'

import Input from "@/components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FiSearch, FiX } from "react-icons/fi"
import { useState } from "react"
import FormTicketMember from "./components/FormTicketMember"
import { api } from "@/lib/api"


const schema = z.object({
  email: z.string().email("Digite o email do membro para localizar.").min(1, "O campo email é obrigatório!")
})

type FormData = z.infer<typeof schema>

export interface ICustomerMemberData {
  id: string
  name: string
}

export default function OpenTicketMember() {

  const [ customer , setCustomer ] = useState<ICustomerMemberData | null>(null)

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleCleanCustomer = () => {
    setCustomer(null)
    setValue("email", "")
  }

  const handleSubmitMember = async (data: FormData) => {
    const response = await api.get("/api/member", {
      params: {
        email: data.email
      }
    })
    if(response.data === null){
      setError("email", { type: 'custom', message: 'Ops, membro não foi encontrado'})
      return
    }
    setCustomer({
      id: response.data.id,
      name: response.data.name
    })
  }

  return (
    <div className='w-full mx-auto max-w-2xl mt-10 px-4 sm:px-0 md:px-0'>
        <h1 className="font-bold text-3xl text-center">
          Abrir Chamado
        </h1>
        <main className="flex flex-col mt-4 mb-2">
            { customer ? (
              <div className="bg-slate-100 py-6 px-2 rounded-md border flex items-center relative">
                <p className="text-lg text-black"><strong>Membro selecionado:</strong> {customer.name}</p>
                <button className="text-red-500 absolute right-5" onClick={handleCleanCustomer}>
                  <FiX size={30}/>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleSubmitMember)}>
                <div>
                  <Input
                    name="email"
                    placeholder="digite email do membro..."
                    type="text"
                    error={errors.email?.message}
                    register={register}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-4 p-2 rounded-md bg-blue-500 h-11
                          text-gray-100 flex items-center justify-center gap-3"
                >
                  Procurar Membro
                  <FiSearch size={22}/>
                </button>
              </form>
            )}

              { customer !== null && <FormTicketMember customer={customer}/> } 
        
        </main>
    </div>
  )
}
''