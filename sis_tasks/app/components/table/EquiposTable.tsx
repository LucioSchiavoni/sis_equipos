'use client';
import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import { Box, Center, Skeleton, Spinner, Stack } from '@chakra-ui/react'

import {
  TabsContent,
} from "@/components/ui/tabs"

import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"





import { ExpandableCardDemo } from './EquipoItem';
import Search from '@/app/components/search/Search'
import { useSearchParams } from 'next/navigation';



const EquiposTable = () => {

    const searchParams = useSearchParams()
    const query = searchParams.get('query') || '';

        const {data, isLoading, error} = useQuery<any[]>({
        queryKey: ['equipos', query],
        queryFn: () =>getEquipos(query)
    })



    if(data && data.length === 0) return (
  <TabsContent value="all">
<Card x-chunk="dashboard-06-chunk-0" className='text-white flex flex-col w-auto m-auto mt-4 glass'>

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
          <p className='text-3xl font-semibold '>No se encontraron equipos.</p>
    </aside>

  </CardContent>
  <CardFooter>
    <div className="text-xs text-muted-foreground">
      Mostrar <strong>1</strong> de <strong>{data.length}</strong>{" "}
      equipos
    </div>
  </CardFooter>
</Card>
</TabsContent>)

      if (isLoading) return (
   
          <div className='min-h-screen w-8/12 mt-24 m-auto p-8'>
           
            <Spinner/>
          </div>
      
        
     
      )
  if (error) return <div>Error al cargar los equipos</div>;

if(data)
  return (
    <TabsContent value="all">
<Card x-chunk="dashboard-06-chunk-0" className='text-white bg-gradient-to-r glass bg-transparent flex flex-col shadow-xl w-auto m-auto mt-4  '>

  <CardHeader className="gap-4">
 

    <CardTitle>Equipos</CardTitle>
    <CardDescription className='text-gray-700 '>
       <div className="relative ml-auto md:grow-0 ">
            <Search placeholder="Buscar equipos..." />
              </div>
                
    </CardDescription>
  </CardHeader>
  <CardContent className='flex items-center justify-center '>
    
    <ExpandableCardDemo equipos={data}  />
  </CardContent>
  <CardFooter>
   <div className="text-xs text-muted-foreground">
      Mostrar <strong>1</strong> de <strong>{data.length}</strong>{" "}
      equipos
    </div>
  </CardFooter>
</Card>
</TabsContent>
  )
}

export default EquiposTable



