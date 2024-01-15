"use client"

import Input from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"


const schema = z.object({
  name: z.string().min(3, "O campo nome é obrigatorio!"),
  email: z.string().email("Digite um email valido.").min(1 , "O campo email é obrigatorio!"),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) 
            || /^d{2}\s\d{9}$/.test(value)
            || /^d{11}$/.test(value)  
  },{
    message: "O numero de telefone deve estar (DD) 999999999"
  }),
  address: z.string().min(3, "O campo endereço é obrigatorio!"),
  cpf: z.string().min(11, "O campo CPF é obrigatorio!"),
  registerRG: z.string().min(9, "O campo RG é obrigatorio!"),
  job: z.string().min(3, "O campo Emprego atual é obrigatorio!"),
  houseNumber: z.string().min(1, "O campo N: é obrigatorio!"),
  complement: z.string().min(3 , "O campo complemento é obrigatorio!")
})

export default function FormNewMember({userId}: {userId: string}) {

  type FormData = z.infer<typeof schema>

  const {register , handleSubmit , formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const [ isLoading , setIsloding ] = useState(true)

  const route = useRouter()

  const handleSubmitMembers = async (data: FormData) => {

    await api.post("/api/member", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cpf: data.cpf,
      job: data.job,
      registerRG: data.registerRG,
      houseNumber: data.houseNumber,
      complement: data.complement,
      userId: userId
    })

    setIsloding(false)
    route.refresh()
    route.replace("/dashboard/members")
  }



  return (
      <form 
        className="flex flex-col mt-6 "
        onSubmit={handleSubmit(handleSubmitMembers)}
      >
        <section className=" flex flex-col sm:flex-none  items-center sm:items-stretch">          
          <div className="flex flex-col flex-2 sm:flex-1">
          <label className="mb-1 text-lg font-medium">Nome Completo: </label>
            <Input 
              type="text"
              name="name"
              placeholder="Digite seu nome..."
              error={errors.name?.message}
              register={register}
            />
          </div>
        </section>

            <section className="w-full mx-auto flex flex-col sm:flex-row items-center gap-4 mt-2 ">
              <div className="flex-1 flex flex-col">
                <label className="mb-1 text-lg font-medium">Email: </label>
                  <Input 
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    error={errors.email?.message}
                    register={register}
                  />
              </div>

              <div className="flex-2 flex flex-col">
                <label className="mb-1 text-lg font-medium">Telefone: </label>
                  <Input 
                    type="text"
                    name="phone"
                    placeholder="exemplo: (DD) 999999999"
                    error={errors.phone?.message}
                    register={register}
                  />
              </div>
            </section>
            <section className=" flex flex-col sm:flex-row items-center  sm:items-stretch gap-4 mt-2 ">
              <div className=" flex flex-col">
                <label className=" mb-1 text-lg font-medium">Endereço: </label>
                  <Input 
                    type="text"
                    name="address"
                    placeholder="Digite seu endereço..."
                    error={errors.address?.message}
                    register={register}
                  />  
              </div>


              <div className=" flex flex-col">
                <label className=" mb-1 text-lg font-medium">Complemento: </label>
                  <Input 
                    type="text"
                    name="complement"
                    placeholder="Ex: Apt"
                    error={errors.complement?.message}
                    register={register}
                  />
              </div>

              <div className="flex flex-col">
                <label className="flex-1 mb-1 text-lg font-medium">Nº: </label>
                  <Input 
                    type="text"
                    name="houseNumber"
                    placeholder="Ex: Nº 12"
                    error={errors.houseNumber?.message}
                    register={register}
                  />
              </div>
            </section>

                <section className=" flex flex-col sm:flex-row items-center gap-4 mt-2 ">
                  <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-lg font-medium">CPF: </label>
                    <Input 
                      type="number"
                      name="cpf"
                      placeholder="Digite seu CPF..."
                      error={errors.cpf?.message}
                      register={register}
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-lg font-medium">RG: </label>
                      <Input 
                        type="number"
                        name="registerRG"
                        placeholder="digite seu RG..."
                        error={errors.registerRG?.message}
                        register={register}
                      />
                  </div>
                </section>

                <div className=" flex flex-col sm:flex-none  items-center sm:items-stretch">
                  <div className="flex-1 flex flex-col sm:flex-none">
                    <label className="mt-2 mb-2 text-lg font-medium">Emprego atual: </label>
                      <Input 
                        type="text"
                        name="job"
                        placeholder="Ex: Medico..."
                        error={errors.job?.message}
                        register={register}
                      />
                  </div>
                </div>
                <div className=" flex flex-col sm:flex-none  items-center sm:items-stretch">
                  <div className="flex">
                    <button 
                      type="submit"
                      className="bg-blue-500 w-[17rem] sm:w-full font-bold h-11 mt-5 sm:mt-3 text-gray-100">
                        {isLoading ? <span>Confirmar</span> : <span>carregando...</span>}
                    </button>
                  </div>
                </div>
      </form>
  )
}
