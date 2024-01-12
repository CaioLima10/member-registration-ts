import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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