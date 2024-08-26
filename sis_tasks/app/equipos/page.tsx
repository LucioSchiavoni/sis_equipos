

import Link from "next/link";
import FormEquipos from "../components/forms/FormEquipos";
import { IoArrowBack } from "react-icons/io5";

export default async function EquiposPage() {
  return (
    
    <div className="bg-white  min-h-screen text-white">
        <Link href={"/dashboard"} className="px-3 py-1 rounded-md shadow-xl border text-black  absolute top-16 left-16 text-2xl hover:bg-gray-200 transition-all"><span><IoArrowBack/></span></Link>
        
           <FormEquipos/>
   
      </div>
  )
}
