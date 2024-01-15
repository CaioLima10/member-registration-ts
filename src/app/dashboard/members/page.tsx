import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardsMembers from "./components/card";
import prismaClient from "@/lib/prisma";
import SearchMember from "@/assets/search-member.png"
import Image from "next/image";

export default async function Members() {

  const session = await getServerSession(authOptions)

  if(!session || !session.user){
    redirect("/")
  }

  const customer = await prismaClient.customer.findMany({
    where:{
      userId: session.user.id
    }
  })

  return (
    <Container>
      <main className="w-full ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Todos os Membros</h1>
          <Link href="/dashboard/members/new" 
            className="bg-blue-500 h-10 w-40 flex items-center justify-center gap-2 text-zinc-100">
            Novo Membro <span className="text-zinc-950 font-bold text-xl">+</span>
          </Link>
        </div>

        <section 
          className="grid grid-cols-1 
          sm:grid-cols-1 sm:w-full lg:grid-cols-2 gap-3 mt-2">
            { customer.map((item) => (
                <CardsMembers key={item.id} customer={item}/>
            ))}
        </section>

        { customer.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image 
              src={SearchMember} 
              alt="search member"
              width={300}  
              height={300}  
            />
            <h1 className="font-semibold text-2xl text-gray-500">Nenhum membro cadastrado!</h1>
          </div>
        ) }
      </main>
    </Container>
  )
}
