import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient()
}else{
    let globalWithGlobal = global as typeof globalThis & {
        prisma: PrismaClient
    }

    if(!globalWithGlobal.prisma){
        globalWithGlobal.prisma = new PrismaClient()
    }

    prisma = globalWithGlobal.prisma
}

export default prisma