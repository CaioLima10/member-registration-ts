import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {

  const session = await getServerSession(authOptions)

  if(!session || !session.user){
      redirect("/")
  }

  const customers = await prismaClient.customer.findMany({
    where:{
      userId: session.user.id
    }
  })

  return (
    <Container>
      <main className="w-full">
        <div className="flex gap-2">
          <Link href="/dashboard" className="py-2 px-4 bg-gray-950 text-gray-100">
              voltar
          </Link>
          
          <h1 className="text-2xl font-bold mt-2">Novo chamado</h1> 
        </div>
          
          <form className="w-full flex flex-col mt-6">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <input
              className="w-full border-2 rounded-md px-2 mb-2 h-11" 
              type="text"
              placeholder="Nome do chamado..."
              required
            />
            <label className="mb-1 font-medium text-lg">Descreva o problema</label>
            <textarea
              className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" 
              placeholder="Descreva o problema..."
              required
            />
          { customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">Selecione o membro</label>
                <select
                  className="w-full border-2 rounded-md px-2 mb-4 h-11 bg-gray-100" 
                >
                  { customers.map((customer) => (
                    <option 
                      key={customer.id} 
                      value={customer.id}>
                        {customer.name}
                    </option>
                  )) }
                </select>  
            </>
          ) }

          { customers.length === 0 && (
            <Link 
              href="/dashboard/members/new"   
            >
              Você ainda não tem nenhum membro cadastrado. <span className="text-blue-500 font-medium">Cadastrar Membro </span>
            </Link>
          ) }

          <button 
            className="bg-blue-500 text-gray-100 h-11 my-3 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={ customers.length === 0 }
          >
            Cadastrar
          </button>
          </form >
      </main>
    </Container>
  )
}
