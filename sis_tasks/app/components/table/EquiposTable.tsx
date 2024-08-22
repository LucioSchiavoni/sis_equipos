'use client';

import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const EquiposTable = () => {


    const {data, isLoading, error} = useQuery({
        queryKey: ['equipos'],
        queryFn:  getEquipos
    })

      if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los equipos</div>;

if(data)
  return (
    <div className='flex items-center justify-center mt-24 text-2xl'>
        {data?.map((item: any, index: any) => (
            <div key={index}>
                <p>{item.pcName}</p>
            </div>
        ))}
    </div>
  )
}

export default EquiposTable