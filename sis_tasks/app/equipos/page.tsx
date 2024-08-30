

import Link from "next/link";
import FormEquipos from "../components/forms/FormEquipos";
import { IoArrowBack } from "react-icons/io5";

export default async function EquiposPage() {
  return (
    
    <div className=" bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]  min-h-screen text-white">
        <Link href={"/dashboard"} className="px-3 py-1 rounded-md shadow-xl border text-black bg-white  absolute top-16 left-16 text-2xl hover:bg-gray-200 transition-all"><span><IoArrowBack/></span></Link>
        
           <FormEquipos/>
   
      </div>
  )
}
