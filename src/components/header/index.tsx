"use client"
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser} from "react-icons/fi"
import { signIn , signOut , useSession } from "next-auth/react";

export default function Header() {

  const { status, data } = useSession()

  console.log(data)

  const handleLogin = async () => {
    await signIn()
  }
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="w-full flex items-center px-4 h-20 py-4 bg-gray-950 text-gray-100">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-1xl hover:tracking-wider duration-300">
            <span className="text-blue-500">Church</span>
            Members
          </h1>
        </Link>

        { status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={22}/>
          </button>
        ) }

        { status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={22}/>
          </button>
        ) }

        { status === "authenticated" && (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <FiUser size={22}/>
            </Link>
            <button className="text-red-500" onClick={handleLogout}>
              <FiLogOut size={22}/>
            </button>
            <div className="flex  items-center gap-3">
              <p>{data.user.name}</p>
              <img className="w-6 rounded-full" src={data.user?.image} alt="top"/>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}
