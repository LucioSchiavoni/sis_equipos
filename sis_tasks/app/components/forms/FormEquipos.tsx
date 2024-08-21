import { Input } from "@/components/ui/input"
import Link from "next/link"


const FormEquipos = () => {
  return (
    <div className="flex justify-center items-center ">
        <Link href={"/dashboard"} className="px-3 py-2 rounded-md border absolute top-5 left-10">Vovler</Link>
        <form action="" className="border p-4 mt-24 space-y-5 w-4/12">
            <div className="space-y-2">
                <label htmlFor="">Nombre de PCd</label>
                <Input placeholder="Nombre.." />
            </div>

            <button className="px-3 py-2 rounded-md border " type="submit">Registrar</button>
        </form>
    </div>
  )
}

export default FormEquipos