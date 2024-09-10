import React from "react";
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button,  } from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";


interface Aplicaiones  {
    aplicacion:{
        nombre:string;
         instalada: boolean;
    }
   
}

const AplicacionesList = ({data}: {data: Aplicaiones[]}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

  return (
    <>

         <Button className="w-32"  colorScheme='blue' onClick={onOpen}>
    Expandir lista
  </Button>
  <Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Lista de aplicaciones instaladas</DrawerHeader> 
       <DrawerBody>
    {
        data.map((item, _) => (          
            <div className="flex gap-2 text-xl  items-center"><span><FaCheckSquare/></span>{item.aplicacion.nombre}</div>

        ))
    }
     </DrawerBody> 

    </DrawerContent>
  </Drawer>
  </>
    

  )
}

export default AplicacionesList