import { redirect } from 'next/navigation';
import { auth } from '../api/auth/[...nextauth]/route';
import Logout from '../components/auth/Logout';

export default async function DashboardPage() {

  const session = await auth()
  if( !session){
    redirect('/register');
  }

  return (
    <div>
      <aside className='absolute top-5 right-10'>
              <Logout/>
      </aside>

      <main className='min-h-screen flex items-center  flex-col'>
          <h1 className='text-center '>El dashboard</h1>
        <h1>{session?.user?.name}</h1>
      </main>
    </div>
  )
}
