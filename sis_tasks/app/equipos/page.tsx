

import Link from "next/link";
import FormEquipos from "../components/forms/FormEquipos";
import { IoArrowBack } from "react-icons/io5";

export default async function EquiposPage() {
  return (
    
    <div className="bg-neutral-900 min-h-screen text-white">
        <Link href={"/dashboard"} className="px-3 py-1 rounded-md border border-neutral-700 absolute top-16 left-16 text-2xl hover:bg-neutral-800 transition-all"><span><IoArrowBack/></span></Link>
        
           <FormEquipos/>
   
      </div>
  )
}
