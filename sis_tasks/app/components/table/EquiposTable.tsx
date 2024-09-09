'use client';
import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Center, Skeleton, Spinner, Stack } from '@chakra-ui/react';

import {
  TabsContent,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExpandableCardDemo } from './EquipoItem';
import Search from '@/app/components/search/Search';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


type Equipo = {
  id: number;
  nombre: string;

};

const EquiposTable = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [page, setPage] = useState(1);
  const limit = 5;


  const { data, isLoading, error, isFetching  } = useQuery<Equipo[]>({
    queryKey: ['equipos', query, page],
    queryFn: () => getEquipos(query, page, limit)
  });


  if (data && data.length === 0) return (
    <TabsContent value="all" className=''>
      <Card x-chunk="dashboard-06-chunk-0" className='text-white bg-transparent flex flex-col w-auto m-auto mt-4 glass'>
        <CardHeader className="gap-4">
          <CardTitle>Equipos</CardTitle>
          <CardDescription className='text-gray-700 '>
            <div className="relative ml-auto md:grow-0 ">
              <Search placeholder="Buscar equipos..." />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center '>
          <aside className='w-[1600px] flex items-center justify-center mt-24 p-8'>
            <p className='text-3xl font-semibold text-black'>No se encontraron equipos con este nombre.</p>
          </aside>
        </CardContent>
        <CardFooter>
      
        </CardFooter>
      </Card>
    </TabsContent>
  );


  if (isLoading) return (
    <div className='min-h-screen w-8/12 mt-24 m-auto p-8'>
      <Spinner />
    </div>
  );

  if (error) return <div>Error al cargar los equipos</div>;

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0" className='text-white bg-gradient-to-r glass bg-transparent flex flex-col shadow-xl w-auto m-auto mt-4'>
        <CardHeader className="gap-4">
          <CardTitle>Equipos</CardTitle>
          <CardDescription className='text-gray-700 '>
            <div className="relative ml-auto md:grow-0 ">
              <Search placeholder="Buscar equipos..." />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center '>
          <ExpandableCardDemo equipos={data ?? []} />
        </CardContent>
        <div className='flex flex-col  items-center gap-2 p-2'>
           <div className='join'>
          <button className="join-item btn" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          «
          </button>
          <div className="join-item btn text-xl">
            Página <strong>{page}</strong>
          </div>
          <button className='join-item btn' onClick={() => setPage((prev) => prev + 1)} disabled={isFetching || (data && data.length < limit)}>
          »
          </button>
          
        </div>
        
        </div>
       
      </Card>
    </TabsContent>
  );
};

export default EquiposTable;
