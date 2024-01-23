
import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import ListMembers from "./components/listMembers";
import prisma from "@/lib/prisma";


export default async function Dashboard() {

  const session = await getServerSession(authOptions) 


  if(!session || !session.user){
    redirect("/")
  }

  const members = await prisma.member.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO"
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: 'desc'
    }

  })

  return (
    <Container>
      <main className="flex flex-col w-full">
        <div className="flex justify-between w-full px-3 md:px-0">
          <h1 className="text-2xl font-bold">Criar membro</h1>
          <Link href="/dashboard/new" 
            className="bg-blue-500 h-10 w-40 flex items-center justify-center gap-2 text-zinc-100">
            Novo Membro <span className="text-zinc-950 font-bold text-xl">+</span>
          </Link>
        </div>
        <table className="w-full my-4">
          <thead>
            <tr>
              <th className="text-left">CLIENTE</th>
              <th className="text-left">DATA</th>
              <th className="text-left">STATUS</th>
              <th className="text-right">FUNÇOES</th>
            </tr>
          </thead>

          <tbody>
            { members.map((item) => (
            <ListMembers 
              key={item.id}
              memberCard={item.customer}
              memberTicket={item}
            />
            )) }
          </tbody>
        </table>
        { members.length === 0 && (
          <h1 className="mt-5 text-gray-600">Nenhum ticket Membro foi encontrado...</h1>
        ) }
      </main>
    </Container>
  )
}
