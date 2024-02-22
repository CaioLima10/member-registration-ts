import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET(request: Request){
  const { searchParams } = new URL(request.url)

  const customerEmail = await searchParams.get("email")

  console.log(customerEmail)

  if(!customerEmail || customerEmail === ""){
    return NextResponse.json({ error: "member not failed" }, { status: 400 })
  }

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "member not found" }, { status: 404 });
    }

    return NextResponse.json(customer);

  } catch (error) {
    return NextResponse.json({error: "member not failed"}, { status: 400 })
  }

}

export  async function DELETE( request: Request ){

  const session = await getServerSession(authOptions)

  if(!session || !session.user){
    return NextResponse.json({ error: "Not authorized"}, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("id")

  if(!userId){
    return NextResponse.json({ error: "Not authorized"}, { status: 401 })
  }

  const memberTicket = await prismaClient.member.findFirst({
    where: {
      id: userId
    }
  })

  if(memberTicket){
    return NextResponse.json({ error: "failed delete member" }, { status: 401 })
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string
      }
    })

    return NextResponse.json({ message: "Membro deletado com sucesso!" })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Not authorized"}, { status: 401 })
  }
} 

export async function POST(request: Request){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
      return NextResponse.json({ error: "Not authorized"}, { status: 401 })
    }

    try {
      const { name, email, phone, address, cpf, registerRG, job, houseNumber, complement, userId } = await request.json() 


      await prismaClient.customer.create({
        data:{
          name,
          email,
          phone,
          address: address ? address : "",
          userId,
          cpf: cpf ? cpf : "",
          registerRG: registerRG ? registerRG : "",
          job: job ? job : "", 
          houseNumber: houseNumber ? houseNumber : "", 
          complement: complement ? complement : ""
          
        }
      })  

      return NextResponse.json({ message: "Membro cadastrado com sucesso!" })

    } catch (error) {
      return NextResponse.json({ error: "failed created new member"}, { status: 400 })
    }
}
