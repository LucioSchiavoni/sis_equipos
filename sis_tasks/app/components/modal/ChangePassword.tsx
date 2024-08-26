"use client";

import { changePassword } from "@/app/api/auth/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Modal, Button, ModalHeader, ModalContent, ModalOverlay, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { toast } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";

export const ChangePassword = ({id}: {id: string}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    
   const handleSubmit  = async (e: any) => {
    e.preventDefault()
      try { 
        
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }
       const res = await changePassword(password, id)
         toast.success(res.success)
      } catch (error) {
        console.log(error)
      }
    }
  


    return (
      <>
        <Button className="" onClick={onOpen}>Cambiar contraseña <RiLockPasswordLine/></Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cambiar password</ModalHeader>
            <ModalCloseButton />
            <div className="flex  flex-col ">
              
                  <form onSubmit={handleSubmit} className="space-y-8 mb-4 w-8/12 border-gray-800  m-auto  rounded-md" >
                    <div>
                         <label htmlFor="" className="text-black font-semibold">Nueva contraseña</label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                     <div>
                         <label htmlFor="" className="text-black font-semibold">Confirmar contraseña</label>
                    <Input type="password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="px-3 py-1 m-auto border  hover:bg-gray-200 rounded-md bg-white text-black font-semibold w-36 flex justify-center shadow-xl">Guardar</button>
                  </form>
      </div>
          </ModalContent>
        </Modal>
      </>
    )
  }