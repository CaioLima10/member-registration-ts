"use client"
"use client"
import { ModalContext } from "@/provider/modal";
import { ICardMembersProps } from "@/utils/member.type";
import { IMemberTicket } from "@/utils/memberTicket.type";
import { useContext } from "react";
import { FiFile, FiTrash2 } from "react-icons/fi";

interface IListMemberProps {
  memberTicket: IMemberTicket 
  memberCard: ICardMembersProps | null
}


export default  function ListMembers({ memberCard, memberTicket }: IListMemberProps) {

    const {handleModalVisible, setDatailTicketMember } = useContext(ModalContext)



    const handleOpenModal = () => {
      handleModalVisible()
      setDatailTicketMember({
        customer: memberCard,
        ticket: memberTicket
      })
    }


  return (
    
    <tr className="border-b-2 border-b-gray-400 h-16 last:border-b-0 mb-5 hover:bg-gray-200"> 
        <td className="text-left pl-0 sm:pl-1">
          { memberCard?.name }
        </td>
        <td className="text-left  sm:items-center">
          {memberTicket.created_at ? memberTicket.created_at.toLocaleDateString("pt-br") : ''}
        </td>
        <td className="text-left text-green-500">
          { memberTicket.status  } 
        </td>
        <td className="text-right">
          <button>
            <FiTrash2 size={22} className="text-red-500"/>
          </button>
          <button>
            <FiFile size={22} className="text-green-500"
              onClick={handleOpenModal}
            />
          </button>
        </td>
      </tr> 
  )
}
