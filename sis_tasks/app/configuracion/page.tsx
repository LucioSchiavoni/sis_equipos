"use client";

import { Input } from "@/components/ui/input";
import Navbar from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import { changePassword } from "../api/auth/actions/auth-actions";
import { auth } from "../api/auth/[...nextauth]/route";
import { useState } from "react";


export default async function ConfiguracionPage() {



   const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
  
 const handleSubmit  = async (e: any) => {
  e.preventDefault()
    try { 

      await changePassword(password, "1")
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div className="min-h-screen bg-neutral-900">
      <Navbar/>
      <div className="flex items-center justify-center py-24 flex-col ">
               <h1 className="text-white text-2xl font-semibold mb-10">Cambiar contraseña </h1>
                  <form onSubmit={handleSubmit} className="space-y-8 border border-gray-800 w-2/12 m-auto  p-8 rounded-md" >
                    <div>
                         <label htmlFor="" className="text-white font-semibold">Nueva contraseña</label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                     <div>
                         <label htmlFor="" className="text-white font-semibold">Confirmar contraseña</label>
                    <Input type="password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="px-3 py-2 hover:bg-gray-200 rounded-md bg-white text-black font-semibold w-28 m-auto">Guardar</button>
                  </form>

      </div>

    </div>

  )
}
