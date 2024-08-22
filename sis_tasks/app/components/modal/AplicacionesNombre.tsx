

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
        <Button variant="outline">Agregar aplicacion</Button>
      </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar aplicacion</DialogTitle>
          <DialogDescription>
          Nuevo nombre de aplicaciones
          </DialogDescription>
        </DialogHeader>
            <FormAplicaciones/>
      </DialogContent>

      </Dialog>
    </>

  )
}

export default AplicacionesNombre