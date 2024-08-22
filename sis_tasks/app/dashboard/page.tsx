

import Link from 'next/link';
import { auth } from '../api/auth/[...nextauth]/route';


import EquiposTable from '../components/table/EquiposTable';



export default async function DashboardPage() {

  const session = await auth()


  return (

      <main className='min-h-screen flex items-center  flex-col'>
      <div className='mt-24  border p-4 flex flex-col gap-5 w-7/12 '>
      <Link href={"/equipos"} className='border px-3 py-1 w-36 rounded-md'>Nuevo equipo</Link>
        <input type="text" placeholder='Buscar por...' className='border px-3 py-2 rounded-md w-6/12 m-auto' name="" id="" />
      <div className='border w-full h-64 p-4'>
        <EquiposTable/>
      </div>
      </div>
      </main>
  
  )
}
