'use client';

import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const EquiposTable = () => {


    const {data, isLoading, error} = useQuery<any[]>({
        queryKey: ['equipos'],
        queryFn: () => getEquipos()
    })

      if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los equipos</div>;

if(data)
  return (
    <div className='flex items-center justify-center mt-24 text-2xl'>
        {data?.map((equipos: any, index: any) => (
            <div key={index} className='border p-4 rounded-md'>
                <p>{equipos.pcName}</p>
                <p>{equipos.numSerie}</p>
                <p>{equipos.autor}</p>
                 <p>{ equipos.fecha}</p>
           {equipos.aplicaciones.map((app: any, index: any) => (
                            <div key={index} className='flex gap-4'>
                                <p>{app.aplicacion.nombre}</p>
                                <p className='flex'>{app.instalada ? 'Instalada' : 'No instalada'}</p>
                            </div>
                        ))}
                 
            </div>
        ))}
    </div>
  )
}

export default EquiposTable