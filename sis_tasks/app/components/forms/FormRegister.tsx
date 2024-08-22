'use client';

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { createUser } from '@/app/api/auth/actions/auth-actions'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const FormRegister = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(""); 
  const router = useRouter();

  
  const handleForm = async(e: any) => {
    e.preventDefault()
    setError("")
    try { 
      const result = await createUser(username, password, name)
      if(result){
         toast.success("Usuario creado con exito!")
          router.push("/login")
      }else{
        setError("El usuario ya existe")
      }
    } catch (error) {
      setError("El usuario ya existe")
    }
  }


  return (

      <form onSubmit={handleForm} className='space-y-12 w-80 text-xl '>   
      
               <div>
          <label htmlFor="
          ">Nombre completo</label>
          
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

   {error && <div className='text-red-500'>{error}</div>}
      </form>
   
   
   
  )
}

export default FormRegister