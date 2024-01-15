import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormNewMember from "../components/form";

export default async function New() {

  const session = await getServerSession(authOptions)

  if(!session || !session.user){
    redirect("/")
  }

  return (
    <Container>
      <main className="w-full">
        <div className="flex items-center gap-3 mt-4">
          <Link 
            href="/dashboard/members"
            className="py-3 px-6 bg-gray-950 text-gray-100"
          >Voltar</Link>
          <h1 className="text-2xl font-bold">Novo Membro</h1>
        </div>

        <FormNewMember userId={session.user.id}/>
      </main>
    </Container>
  )
}
