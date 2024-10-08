
import Link from 'next/link';
import { auth } from '../api/auth/[...nextauth]/route';
import {
      ListFilter,
    } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
      Card,
      CardDescription,
      CardFooter,
      CardTitle,
    } from "@/components/ui/card"
import {
      DropdownMenu,
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import EquiposTable from '../components/table/EquiposTable';
import { BsPcDisplayHorizontal } from "react-icons/bs";
import AplicacionesNombre from '../components/modal/AplicacionesNombre';




export default async function DashboardPage() {

  const session = await auth()
  const nameUser = session?.user?.name
    const nameAvatar = nameUser?.substring(0,1)
    

  return (
<>
        <div className="flex min-h-screen w-8/12 m-auto flex-col justify-center"> 
          <div className="flex flex-col justify-center items-center mt-6 "> 
          
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
                  <DropdownMenuLabel className='capitalize'>{nameUser}</DropdownMenuLabel>
                
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <Card
                className="sm:col-span-2  justify-start flex  hover:scale-110 transition-all delay-150 duration-300" x-chunk="dashboard-05-chunk-0" >
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
            <main className="grid flex-1 items-start gap-4 p-4  ">
              <Tabs defaultValue="all">
                <div className="flex items-center">

                  <div className="ml-auto flex items-center gap-2">
                    <AplicacionesNombre/>
                  </div>
                </div>
                <TabsContent value="all"  >
                     
                      
                    <EquiposTable />


                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
        </>
      )
    
}
