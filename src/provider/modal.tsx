"use client"

import Modal from "@/components/modal";
import { createContext, useState } from "react";
import { IMemberTicket } from "@/utils/memberTicket.type";
import { ICardMembersProps } from "@/utils/member.type";


interface IModalContextData {
    visible: boolean
    handleModalVisible: () => void
    ticketMember: ITicketMemberInfo | undefined
    setDatailTicketMember: (datail: ITicketMemberInfo) => void
}

interface ITicketMemberInfo {
    ticket: IMemberTicket
    customer: ICardMembersProps | null
} 


export const ModalContext = createContext({} as IModalContextData)

export function ModalProvider({ children }: { children: React.ReactNode }) {

    const [ visible , setVisible ] = useState(false)
    const [ ticketMember , setTicketMember ] = useState<ITicketMemberInfo>()

    const handleModalVisible = () => {
        setVisible(!visible)
    }

    const setDatailTicketMember = (datail: ITicketMemberInfo) => {
        setTicketMember(datail)
        console.log(datail)
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, ticketMember, setDatailTicketMember }}>
            { visible && <Modal/> }
            { children }
        </ModalContext.Provider>
    )
}
