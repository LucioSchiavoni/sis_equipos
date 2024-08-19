import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {

  const session = await getServerSession(authOptions)

  if( !session){
    redirect('/api/auth/signin');
  }
  return (
    <div className='bg-white text-white min-h-screen text-2xl'>

        <p>Hola usuario!!!</p>
        {
           session.user?.name
        }
    </div>
  )
}

