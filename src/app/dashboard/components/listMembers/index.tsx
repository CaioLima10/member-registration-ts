
import { FiFile, FiTrash2 } from "react-icons/fi";

export default function ListMembers() {

  return (
    
    <tr className="border-b-2 border-b-gray-400 h-16 last:border-b-0 mb-5 hover:bg-gray-200"> 
        <td className="text-left pl-0 sm:pl-1">
          Caio lima
        </td>
        <td className="text-left  sm:items-center">
          14/09/1997
        </td>
        <td className="text-left text-green-500">
          ATIVO  
        </td>
        <td className="text-right">
          <button>
            <FiTrash2 size={22} className="text-red-500"/>
          </button>
          <button>
            <FiFile size={22} className="text-green-500"/>
          </button>
        </td>
      </tr> 
  )
}
