'use client';

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { createUser } from '@/app/api/auth/actions/auth-actions'
import { useRouter } from 'next/router'

const FormRegister = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")


  const handleForm = async(e: any) => {
    e.preventDefault()
    try {
  
      const result = await createUser(username, password, name)
      return result;
    } catch (error) {
      console.log(error)
    }
  }


  return (

      <form onSubmit={handleForm} className='space-y-12 w-80 text-xl'>   
      
               <div>
          <label htmlFor="
          ">Nombre de usuario</label>
          
           <Input value={name} className='text-xl'   onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
           <label htmlFor="
          ">Nombre de usuario</label>

           <Input  onChange={(e) => setUsername(e.target.value)} />
        </div>
             
               <div>
          <label htmlFor="
          ">Nombre de usuario</label>
          
           <Input type='password' value={password} className='text-xl' onChange={(e) => setPassword(e.target.value)} />
        </div>
    <button type='submit' className='px-3 py-1 rounded-md border'>Registrarse</button>
      </form>
   
   
   
  )
}

export default FormRegister