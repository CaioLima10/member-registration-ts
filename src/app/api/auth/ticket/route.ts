import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { customerId, name, description } = await request.json();

    console.log(customerId, name, description);

    if (!customerId || !name || !description) {
        return NextResponse.json(
            { message: "necessario preencher todos os campos" },
            { status: 400 }
        );
    }

    try {
        await prisma.member.create({
            data: {
                name: name,
                description: description,
                customerId: customerId,
                status: 'ABERTO',
            },
        });

        return NextResponse.json({ message: 'ticket criado com sucesso!' });

    } catch (error) {
        console.error("Erro ao criar ticket:", error);
        return NextResponse.json(
            { message: "Erro ao criar ticket. Verifique os dados fornecidos." },
            { status: 500 }
        );
    }
}
