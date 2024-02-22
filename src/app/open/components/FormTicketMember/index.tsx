"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Input from "@/components/input"
import { ICustomerMemberData } from "../../page"
import { api } from "@/lib/api"

const schema = z.object({
  name: z.string().min(3, "O nome do chamado é obrigatorio!"),
  description: z.string().min(3, "Descreva um pouco sobre seu problema...")
})

type FormData = z.infer<typeof schema> 

interface IFormMemberData {
  customer: ICustomerMemberData
}

export default function FormTicketMember({ customer }: IFormMemberData) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleCreateSubmit = async (data: FormData) => {

      console.log(data)
      const response = await api.post("/api/ticket", {
        data: {
          name: data.name,
          description: data.description,
          customerId: customer.id
        }
      })
      console.log(response.data)

  }

  return (
    <form onSubmit={handleSubmit(handleCreateSubmit)}>
      <div className="mt-4">
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <Input 
            type="text"
            name="name"
            placeholder="Digite seu nome..." 
            register={register}
            error={errors.name?.message}
          />
      </div>
      <div className="flex flex-col mt-2">
        <label className="font-medium text-lg">Descrição</label>
          <textarea 
            className="border-2 resize-none h-36 mb-2"
            { ...register("description") }  
            placeholder="Digite sua descrição..."
            id="description"
          />
          { errors.description?.message &&
            <p className="text-red-500">
              {errors.description?.message}
            </p> 
          }
      </div>
        <button 
          type="submit"
          className="w-full mt-4 p-2 rounded-md bg-blue-500 h-11
                  text-gray-100 flex items-center justify-center gap-3"
        >
          Confirmar
        </button>
    </form>
  )
}
