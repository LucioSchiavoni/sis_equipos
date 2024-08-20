import Link from 'next/link'
import FormRegister from '../components/forms/FormRegister'

export default async function RegisterPage() {
  return (
    <div className='flex justify-center '>
          <Link href={"/"} className="px-4 hover:bg-gray-100 py-1 text-xl border w-24 text-center font-medium rounded-md  absolute top-10 left-10 text-black">Inicio</Link>
        <article className='mt-52'>
                <FormRegister/>
        </article>

      
      </div>
  )
}

