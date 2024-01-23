"use client"
import { ModalContext } from "@/provider/modal";
import { MouseEvent, useContext, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";


export default function Modal() {

    const { ticketMember } = useContext(ModalContext)



    const { handleModalVisible } = useContext(ModalContext)
    const modalRef = useRef<HTMLTableSectionElement | null>(null)


    const handleModalClick = (event: MouseEvent<HTMLTableSectionElement>) => {
        if(modalRef.current && !modalRef.current.contains(event.target as Node)){
            handleModalVisible()
        }
    }


  return (
    <section 
        className="absolute bg-gray-900/80 w-full min-h-screen"
        onClick={handleModalClick}
    >
        { }
        <div className="flex items-center justify-center h-screen">
            <div 
                className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 min-h-64 relative"
                ref={modalRef}    
            >
                <button 
                    className="text-red-500 bg-white rounded-full absolute -top-4 -right-4"
                    onClick={handleModalVisible}    
                >
                    <IoMdCloseCircle size={32}/>
                </button>
                <div>
                    <h1 className="font-bold text-lg md:text-2xl ">Detalhes do chamado</h1>
                </div>
                <div className="flex flex-wrap gap-2 mb-2 mt-3">
                    <h2 className="font-bold">Nome:</h2>
                    <p>{ticketMember?.ticket.name}</p>
                </div>
                <div className="flex flex-col flex-wrap gap-2 ">
                    <h2 className="font-bold">Descrição:</h2>
                    <p>
                        { ticketMember?.ticket.description } 
                    </p>
                </div>
                <div className="container border-b-2 border-gray-400 my-4"></div>
                <div>
                    <h1 className="font-bold text-lg md-1xl">Detalhes do Membro</h1>
                </div>

                <div className="flex flex-wrap gap-2 mb-1 mt-3">
                    <h2 className="font-bold">Nome: </h2>
                    <p>{ticketMember?.customer?.name}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-1">
                    <h2 className="font-bold">Telefone: </h2>
                    <p>{ticketMember?.customer?.phone}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-1">
                    <h2 className="font-bold">Email: </h2>
                    <p>{ticketMember?.customer?.email}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-1">
                    <h2 className="font-bold">Endereço: </h2>
                    <p>{ticketMember?.customer?.address}</p>
                </div>

            </div>
        </div>
    </section>
  )
}
