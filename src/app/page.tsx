import Image from 'next/image'
import ImgFamily from '@/assets/family-church.png'
import ImgFamilyEq from '@/assets/family.jpg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    
    <main  className='flex flex-col items-center justify-center w-full'>
      { !session?.user ? (
        <>        
          <h2 className='text-2xl font-bold mt-2'>
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
        <div className='w-full h-min  flex items-center justify-center mt-14 gap-8'>
              <Image src={ImgFamilyEq} alt="img" width={350} height={350}/>
          <Link href="/dashboard" className='px-20 py-4 bg-blue-500'>
            dashboard
          </Link>
        </div>
      )}
    </main>
  )
}

