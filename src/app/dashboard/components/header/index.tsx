import React from 'react'
import Container from '../../../../components/container'
import Link from 'next/link'

export default function Navbar() {

  return (
    <Container>
        <header className='flex gap-4 h-20 px-4 items-center
                        bg-gray-950 text-gray-100 w-full'>
            <Link href="/dashboard" className='hover:font-bold duration-200'>
                Listar                
            </Link>
            <Link href="/dashboard/members" className='hover:font-bold duration-200'>
                Membros
            </Link>
        </header>
    </Container>
  )
}
