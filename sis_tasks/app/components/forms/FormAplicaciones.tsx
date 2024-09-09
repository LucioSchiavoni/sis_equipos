'use client';

import { createAplicaciones } from "@/app/api/aplicaciones/aplicaciones-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { toast } from "react-toastify"



const FormAplicaciones = () => {

    const [nombre, setNombre] = useState("")

 const queryClient = useQueryClient();
    const handleSubmit = async(e: any) => {
        e.preventDefault()  
        
        try {
            const res = await createAplicaciones(nombre)
            
            if(res?.success){
              await queryClient.invalidateQueries({queryKey: ['aplicaciones']})
                toast.success(res?.success)
                
            }else{
                toast.info(res?.info)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4 ">
                <Input placeholder="" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                <button className="h-8 hover:bg-cyan-700  px-3 rounded-md shadow-xl   bg-cyan-800 text-white font-thin text-lg"  type="submit">Agregar </button>
        </form>
    </div>
  )
}

export default FormAplicaciones