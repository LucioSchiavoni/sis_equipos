

import Link from "next/link";
import FormEquipos from "../components/forms/FormEquipos";

export default async function EquiposPage() {
  return (
    
    <div className="">
        <Link href={"/dashboard"} className="px-3 py-2 rounded-md border absolute top-5 left-10">Vovler</Link>
        
           <FormEquipos/>
   
     
      
      </div>
  )
}
