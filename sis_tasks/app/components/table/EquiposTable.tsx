'use client';
import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TabsContent,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"

import AplicacionesNombre from '../modal/AplicacionesNombre';

import { Input } from '@/components/ui/input';
import { ExpandableCardDemo } from './EquipoItem';


const EquiposTable = () => {

    const {data, isLoading, error} = useQuery<any[]>({
        queryKey: ['equipos'],
        queryFn: () => getEquipos()
    })


    if(data && data.length === 0) return (
    <div className='text-gray-700 flex flex-col gap-5 text-2xl text-center'>
      Sin equipos creados.
      <Button size="sm" className="h-8 gap-1 w-36 m-auto">
                      <PlusCircle className="h-3.5 w-3.5" />
                   <AplicacionesNombre/>
                    </Button>
      </div> )

      if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los equipos</div>;

if(data)
  return (
    <TabsContent value="all">
<Card x-chunk="dashboard-06-chunk-0" className='text-white  border-neutral-700 w-auto m-auto mt-4 bg-neutral-800 bg-opacity-50'>
  <CardHeader className="gap-4">
    <CardTitle>Equipos</CardTitle>
    <CardDescription className='text-gray-700 '>
       <div className="relative ml-auto md:grow-0 ">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar un equipo..."
                  className="w-full rounded-lg text-xl bg-background pl-8 text-black  lg:w-[336px]"
                />
              </div>
    </CardDescription>
  </CardHeader>
  <CardContent className='flex items-center justify-center '>
    <ExpandableCardDemo equipos={data}  />
  </CardContent>
  <CardFooter>
    <div className="text-xs text-muted-foreground">
      Mostrar <strong>1-10</strong> de <strong>32</strong>{" "}
      equipos
    </div>
  </CardFooter>
</Card>
</TabsContent>
  )
}

export default EquiposTable



