"use client"
import Container from "@/components/container";
import { ICardMembersProps } from "@/utils/member.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa"

export default  function CardsMembers({ customer } : { customer : ICardMembersProps}) {

  const route = useRouter()
  
    const handleDeleteMember = async () => {
      try {
        const response = await api.delete("/api/member", {
          params: {
            id: customer.id
          }
        })

        if(response.data){
          route.refresh()
        }
        
      } catch (error) { 
        console.log(error)
      }

    }
    

  return (
    <Container>
      <article className=" shadow-xl min-h-72 min-w-96 p-4  bg-slate-100 border  hover:scale-105 duration-200 relative">
          <div className="flex flex-col h-10">
            <h2><a className="font-bold mb-2">Nome:</a>{customer.name}</h2>
            <p><a className="font-bold mb-2">Email:</a>{customer.email}</p>
            <p><a className="font-bold mb-2">Telefone:</a>{customer.phone}</p>
            <p><a className="font-bold mb-2">endereço:</a>{customer.address}</p>
            <p><a className="font-bold mb-2">complement:</a>{customer.complement}</p>
            <p><a className="font-bold mb-2">houseNumber:</a>{customer.houseNumber}</p>
            <p><a className="font-bold mb-2">CPF:</a>{customer.cpf}</p>
            <p><a className="font-bold mb-2">RG:</a>{customer.registerRG}</p>
            <p><a className="font-bold mb-2">Profissão:</a>{customer.job}</p>
            <div className="flex items-end justify-end">
              <button onClick={handleDeleteMember} className="w-10 h-10  text-red-500 cursor-pointer bottom-0 right-0 absolute">
                <FaTrash size={26}/>
              </button>
            </div>  
          </div>
      </article>
    </Container>
  )
}
