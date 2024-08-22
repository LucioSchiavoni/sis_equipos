'use client';
import { getEquipos } from '@/app/api/equipos/equipos-actions';
import { useQuery } from '@tanstack/react-query';
import {
  MoreHorizontal,
  PlusCircle,
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
import Image from 'next/image';
import Link from 'next/link';


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
                      <Link href={'/equipos'} className="sr-only  sm:not-sr-only sm:whitespace-nowrap">
                        Agregar equipo
                      </Link>
                    </Button>
      </div> )

      if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los equipos</div>;

if(data)
  return (
    <TabsContent value="all">
<Card x-chunk="dashboard-06-chunk-0" className='bg-neutral-900 text-white border-neutral-700'>
  <CardHeader>
    
    <CardTitle>Equipos</CardTitle>
    <CardDescription className='text-white'>
      Todos los equipos.
    </CardDescription>
  </CardHeader>
  <CardContent >
    <Table>
      <TableHeader >
        <TableRow  >
          <TableHead className='text-white'>Nombre PC</TableHead>
          <TableHead className='text-white'>Numero de serie</TableHead>
          <TableHead className="hidden md:table-cell text-white">
            Autor
          </TableHead>
          <TableHead className="hidden md:table-cell text-white">
              Unidad
          </TableHead>
          <TableHead className="hidden md:table-cell text-white">
            Fecha
          </TableHead>
          <TableHead className='text-white'>
            <span className="">Opciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>  
         {
            data.map((equipos: any, index: any) => (
            <>  
        <TableRow key={index} className=''>
      
       
          <TableCell className="hidden sm:table-cell">
              {equipos.pcName}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {equipos.numSerie}
          </TableCell>
          <TableCell className="font-medium">
            {equipos.autor}
          </TableCell>
          <TableCell>
            <Badge variant="outline" className='text-white'>{equipos.unidad}</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
          {equipos.fecha}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
         

        </TableRow>
         </>
   ))
}     
      
      </TableBody>
    </Table>
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



