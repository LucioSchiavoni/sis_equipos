

import Link from "next/link";
import FormEquipos from "../components/forms/FormEquipos";

export default async function EquiposPage() {
  return (
    
    <div className="bg-neutral-900 min-h-screen text-white">
        <Link href={"/dashboard"} className="px-3 py-1 rounded-md border border-neutral-700 absolute top-5 left-10">Vovler</Link>
        
           <FormEquipos/>
   
      </div>
  )
}
