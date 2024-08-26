'use client';


import { getAplicaciones } from "@/app/api/aplicaciones/aplicaciones-actions"
import { createEquipo } from "@/app/api/equipos/equipos-actions"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";



const FormEquipos = () => {

  const [pcName, setPcName] = useState("")
  const [numSerie, setNumSerie] = useState("")
  const [unidad, setUnidad] = useState("")
  const [autor, setAutor] = useState("")
    const [selectedAplicaciones, setSelectedAplicaciones] = useState<{ id: number, instalada: boolean }[]>([])

    const routes = useRouter();

    const { data: aplicaciones, isLoading, error } = useQuery<any[]>({
    queryKey: ['aplicaciones'],
    queryFn:  () =>getAplicaciones()
  })

  
  if(isLoading) return ( 
    <div>Cargando...</div>
  )

  
  if(error) return ( 
    <div>Error al cargar los datos...</div>
  )
 const queryClient = useQueryClient();

const handleCheckboxChange = (aplicacionId: number) => {
  setSelectedAplicaciones(prev => {
    const exists = prev.find(app => app.id === aplicacionId);
    if (exists) {
      return prev.map(app =>
        app.id === aplicacionId ? { ...app, instalada: !app.instalada } : app
      );
    }
    return [...prev, { id: aplicacionId, instalada: true }];
  });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
      const equipoData = {
      pcName,
      numSerie,
      unidad,
      autor,
      aplicaciones: selectedAplicaciones.map(app => ({
        aplicacionId: app.id,
        instalada: app.instalada
      })),
    };
    const res = await createEquipo(equipoData);
    
    if (res?.success) {
      queryClient.invalidateQueries({queryKey: ['equipos']});
      routes.push("/dashboard")
      toast.success(res.success);
    } else {
      toast.error(res?.error || 'Ocurrió un error al crear el equipo');
    }
  } catch (error) {
    toast.error('Error en la solicitud. Inténtalo de nuevo.');
  }
};


if(aplicaciones)
  return (
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="border bg-cyan-900 border-neutral-700 rounded-md  p-6 mt-24 space-y-5 w-3/12">
          <div className="space-y-2">
                <label htmlFor="">Nombre de PC</label>
                <Input placeholder="DGS-PC.." className="text-black focus:border focus:outline-none border-cyan-700" value={pcName}  onChange={(e) => setPcName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <label htmlFor="">Numero de serie</label>
                <Input placeholder="Serie.." value={numSerie} className="text-black focus:border  focus:outline-none focus:border-cyan-600 focus:ring-cyan-600"  onChange={(e) => setNumSerie(e.target.value)} />
            </div>
            <div className="space-y-2">
                <label htmlFor="">Unidad</label>
                <Input placeholder="Unidad.." value={unidad} className="text-black focus:border border-cyan-700"  onChange={(e) => setUnidad(e.target.value)} />
            </div>
              <div className="space-y-2">
                <label htmlFor="">Autor</label>
                <Input placeholder="Autor.." value={autor}  className="text-black focus:border border-cyan-700" onChange={(e) => setAutor(e.target.value)} />
            </div>
    


            {
              !aplicaciones || aplicaciones.length === 0 ? <div>No hay aplicaciones disponibles</div> : null
            }
            <div className="grid grid-cols-2  gap-2">

          
            {
              aplicaciones?.map((app: {id: number, nombre: string}) => (
                <div key={app.id} className="flex gap-2 items-center text-xl">
                <input 
                type="checkbox"
                id={`app-${app.id}`}
                className="text-2xl p-4 rounded-md"
                onChange={() => handleCheckboxChange(app.id)}
                checked={selectedAplicaciones.some(a => a.id === app.id && a.instalada)}
              />
              <label htmlFor={`app-${app.id}`}>{app.nombre}</label>
                </div>
              ))
            } 
            </div>
            <div className="flex items-center justify-center">
                <button className="hover:bg-gray-200 text-cyan-900 font-semibold py-1 w-64 text-xl  rounded-md  bg-white " type="submit">Registrar</button>
            </div>
          
        </form>
    </div>
  )
}

export default FormEquipos