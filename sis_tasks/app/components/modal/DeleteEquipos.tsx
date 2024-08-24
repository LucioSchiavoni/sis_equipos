"use client";

import React from "react"
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react"
import { deleteEquipo } from "@/app/api/equipos/equipos-actions"
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
export const DeleteEquipo = ({id}: {id: number}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const queryClient = useQueryClient();



    const handleDelete = async() => {
        try {
        const res = await deleteEquipo(id)
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
      <span className="text-xl"><MdOutlineDelete/></span>
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent className="p-6 text-center h-40 gap-5">
          <ModalHeader className="text-3xl">Desea eliminar este equipo?</ModalHeader>
            
          <ModalCloseButton />
          <div className="gap-4 flex justify-center items-center">
            <button className="px-3 py-1 rounded-md border hover:bg-gray-100 w-28 font-medium" onClick={handleDelete}>Eliminar</button>
            <button className="px-3 py-1 rounded-md border hover:bg-gray-100 w-28 font-medium"  onClick={onClose}>
            Cancelar
            </button>
          </div>
         
        </ModalContent>
      </Modal>
    </>
  )
}