import Link from 'next/link';
import { auth } from '../api/auth/[...nextauth]/route';
import {
      File,
      ListFilter,
      PlusCircle,
      Search,
    } from "lucide-react"
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
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import EquiposTable from '../components/table/EquiposTable';

import { BsPcDisplayHorizontal } from "react-icons/bs";
import AplicacionesNombre from '../components/modal/AplicacionesNombre';
import Logout from '../components/auth/Logout';


export default async function DashboardPage() {

  const session = await auth()
  const nameUser = session?.user?.name
    const nameAvatar = nameUser?.substring(0,1)

  return (
<>
        <div className="flex min-h-screen w-full flex-col bg-neutral-900">
       
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0  z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden absolute top-5 p-6 right-10 rounded-full"
                    >
                      <span className='capitalize   rounded-full text-4xl font-medium'>{nameAvatar}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Configuracion</DropdownMenuItem>
                  <DropdownMenuSeparator />
      
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <Card
                className="sm:col-span-2 w-3/12 flex ml-12 hover:scale-110 transition-all delay-150 duration-300" x-chunk="dashboard-05-chunk-0" >
                <Link href={'/equipos'} className="pb-8 p-6">
                  <CardTitle className='flex gap-4'>Registrar equipos </CardTitle>
                  <CardDescription className="max-w-lg  text-gray-600 text-balance mt-3">
                    Ingresa aqui para registrar un nuevo equipo con sus aplicaciones.
                  </CardDescription>
                </Link>
                <CardFooter >
                  <p className=' text-4xl'><BsPcDisplayHorizontal /></p>
                </CardFooter>
              </Card>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
              <Tabs defaultValue="all">
                <div className="flex items-center">

                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10 gap-1">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Archived
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-10 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export CSV
                      </span>
                    </Button>
                    <AplicacionesNombre/>
                  </div>
                </div>
                <TabsContent value="all"  >
                  
                  <Card x-chunk="dashboard-06-chunk-0" className='bg-neutral-900 text-white border-none mt-8 ' >
                    <CardContent>
                      
                     <EquiposTable/>

                    </CardContent>
          
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
        </>
      )
    
}
