import Image from 'next/image'
import ImgFamily from '@/assets/family-church.png'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {


  const session = await getServerSession(authOptions)


  return (
    
    <main  className='flex flex-col items-center justify-center w-full min-h-screen'>
      { !session?.user ? (
        <>        
          <h2 className='text-2xl font-bold'>
            Olá Seja Membro da Igreja
          </h2>
          <h1 className='text-3xl text-blue-500 font-bold'>
            se Cadastre!
          </h1>
          <Image
            width={600}
            className='w-80 md:w-96' 
            src={ImgFamily} alt="CAPA">
          </Image>
        </>        
      ):(
        <div>
          <Link href="/dashboard" className='px-20 py-4 bg-blue-500'>
            dashboard
          </Link>
        </div>
      )}
    </main>
  )
}

