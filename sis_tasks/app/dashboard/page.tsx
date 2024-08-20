import { redirect } from 'next/navigation';
import { auth } from '../api/auth/[...nextauth]/route';
import Logout from '../components/auth/Logout';

export default async function DashboardPage() {

  const session = await auth()


  return (
    <div>


      <main className='min-h-screen flex items-center  flex-col'>

      <div>
        
      </div>
      </main>
    </div>
  )
}
