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
                <label htmlFor="">Nombre de la aplicacion</label>
                <Input placeholder="Nombre.." value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <Button type="submit">Agregar </Button>
        </form>
    </div>
  )
}

export default FormAplicaciones