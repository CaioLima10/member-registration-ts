"use client"
import Link from "next/link";
import {FiLoader, FiLogOut, FiUser} from "react-icons/fi"
import { FaLock } from "react-icons/fa";
import { signIn , signOut , useSession } from "next-auth/react";

export default function Header() {

  const { status, data } = useSession()

  const handleSignIn = async () => { 
    await signIn() 
  }
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="w-full flex items-center px-8 h-20 py-4 bg-gray-950 text-gray-100">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-1xl hover:tracking-wider duration-300">
            <span className="text-blue-500">Church</span>
            Members
          </h1>
        </Link>

   

          { status === "unauthenticated" && (
            <button onClick={handleSignIn}>
              <FaLock size={22}/>
            </button>
          ) }

          { status === "authenticated" && (
            <div className="flex items-center gap-4">
              <Link href="/">
                <FiUser size={22}/>
              </Link>
              <button onClick={handleSignOut}>
                <FiLogOut size={22}/>
              </button>
            </div>
          )}
      </div>
    </header>
  )
}
