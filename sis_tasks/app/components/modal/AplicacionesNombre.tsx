import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormAplicaciones from "../forms/FormAplicaciones"

const AplicacionesNombre = () => {
  return (
    <>    
     <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-cyan-700 text-white hover:bg-cyan-600 hover:text-white">Agregar programa</Button>
      </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-52 text-4xl">
        <DialogHeader>
          <DialogTitle>  Introduce el nombre del programa</DialogTitle>
          <DialogDescription>
          Por ej: Castaglia, Drivers, Antivirus, etc.
          </DialogDescription>
        </DialogHeader>
            <FormAplicaciones/>
      </DialogContent>

      </Dialog>
    </>

  )
}

export default AplicacionesNombre