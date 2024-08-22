'use client';

import { getAplicaciones } from "@/app/api/aplicaciones/aplicaciones-actions"
import { createEquipo } from "@/app/api/equipos/equipos-actions"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"



const FormEquipos = () => {

  const [pcName, setPcName] = useState("")
  const [numSerie, setNumSerie] = useState("")
  const [unidad, setUnidad] = useState("")
  const [autor, setAutor] = useState("")
    const [selectedAplicaciones, setSelectedAplicaciones] = useState<{ id: number, instalada: boolean }[]>([])


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
 const queryClient = useQueryClient();

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
      toast.success(res.success);
    } else {
      toast.error(res?.error || 'Ocurrió un error al crear el equipo');
    }
  } catch (error) {
    toast.error('Error en la solicitud. Inténtalo de nuevo.');
  }
};


  if (!aplicaciones || aplicaciones.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="border p-4 mt-24 space-y-5 w-4/12">
          <div>No hay aplicaciones disponibles.</div>
        </div>
      </div>
    )
  }

if(aplicaciones)
  return (
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="border p-4 mt-24 space-y-5 w-4/12">
            <div className="space-y-2">
                <label htmlFor="">Nombre de PC</label>
                <Input placeholder="DGS-PC.." value={pcName}  onChange={(e) => setPcName(e.target.value)} />
            </div>
               <div className="space-y-2">
                <label htmlFor="">Numero de serie</label>
                <Input placeholder="Serie.." value={numSerie}  onChange={(e) => setNumSerie(e.target.value)} />
            </div>
               <div className="space-y-2">
                <label htmlFor="">Unidad</label>
                <Input placeholder="Unidad.." value={unidad}  onChange={(e) => setUnidad(e.target.value)} />
            </div>
               <div className="space-y-2">
                <label htmlFor="">Autor</label>
                <Input placeholder="Autor.." value={autor}  onChange={(e) => setAutor(e.target.value)} />
            </div>
            {
              aplicaciones?.map((app: {id: number, nombre: string}) => (
                <div key={app.id}>
                <input
                type="checkbox"
                id={`app-${app.id}`}
                onChange={() => handleCheckboxChange(app.id)}
                checked={selectedAplicaciones.some(a => a.id === app.id && a.instalada)}
              />
              <label htmlFor={`app-${app.id}`}>{app.nombre}</label>
                </div>
              ))
            }
            <button className="px-3 py-2 rounded-md border " type="submit">Registrar</button>
        </form>
    </div>
  )
}

export default FormEquipos