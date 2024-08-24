"use client";

import React, { useState } from "react"
import { useDisclosure, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react"
import { deleteEquipo, editEquipo } from "@/app/api/equipos/equipos-actions"
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
export const EditEqupo = ({id}: {id: number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const [nombrePc, setNombrePc] = useState("")
  const [numSerie, setNumSerie] = useState("")
  const [autor, setAutor] = useState("")
  const [unidad, setUnidad] = useState("")

  
 const queryClient = useQueryClient();
    const handleEdit = async(e: any) => {
        e.preventDefault()
        try {
        const dataJson: any = {
        ...(nombrePc && { pcName: nombrePc }),
        ...(numSerie && { numSerie }),
        ...(autor && { autor }),
        ...(unidad && { unidad }),
      };
        const res = await editEquipo(id, dataJson)
        if(res?.success){
        queryClient.invalidateQueries({queryKey: ['equipos']}); 
        toast.success(res?.success)
        onClose();
        }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    
       <Button mt={4} onClick={onOpen}>
      <span className="text-xl"><FiEdit/></span>
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent className="p-6 text-center  gap-5">
          <ModalHeader className="text-3xl">Editar equipo</ModalHeader>
          <div>
            <form onSubmit={handleEdit} className="px-8 pb-4 space-y-4 text-start">
                <div>
                   <label htmlFor="" className="font-medium">Nombre de PC</label>
                <Input value={nombrePc} onChange={(e) => setNombrePc(e.target.value)}/> 
                </div>
                   <div>
                   <label htmlFor="" className="font-medium">Numero de serie</label>
                <Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)}/> 
                </div>
                       <div>
                   <label htmlFor="" className="font-medium">Unidad</label>
                <Input value={unidad} onChange={(e) => setUnidad(e.target.value)}/> 
                </div>
                            <div>
                   <label htmlFor="" className="font-medium">Autor</label>
                <Input value={autor} onChange={(e) => setAutor(e.target.value)}/> 
                </div>
          <ModalCloseButton />
          <div className="gap-4 flex justify-center items-center pt-4">
            <button className="px-2 py-1 rounded-md border hover:bg-gray-100 w-36 font-medium" type="submit">Guardar cambios</button>
            <button className="px-3 py-1 rounded-md border hover:bg-gray-100 w-28 font-medium"  onClick={onClose}>
            Cancelar
            </button>
          </div>
          </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}