"use client";

import { changePassword } from "@/app/api/auth/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Modal, Button, ModalHeader, ModalContent, ModalOverlay, ModalFooter, ModalCloseButton, useDisclosure, Tooltip } from "@chakra-ui/react"
import { useState } from "react";
import { toast } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";
import { signOut } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/router";

export const ChangePassword = ({id}: {id: string}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const router = useRouter();
    
      try {
        if (password !== confirmPassword) {
          toast.error("Las contraseñas no coinciden.");
          return;
        }
    
        const res = await changePassword(password, id);
    
        if (res.success) {
          toast.success(res.success);
    
          
          await signOut({ redirect: false });
          router.push("/auth/login");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al cambiar la contraseña.");
      }
    };
  


    return (
      <>
      <Tooltip label="Cambiar contraseña">
        <button className="hover:bg-cyan-900 p-1 rounded-md text-3xl text-white" onClick={onOpen}> <RiLockPasswordLine/></button>
  </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cambiar password</ModalHeader>
            <ModalCloseButton />
            <div className="flex  flex-col ">
              
                  <form onSubmit={handleSubmit} method="POST" className="space-y-8 mb-4 w-8/12 border-gray-800  m-auto  rounded-md" >
                    <div>
                         <label htmlFor="" className="text-black font-semibold">Nueva contraseña</label>
                    <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                     <div>
                         <label htmlFor="" className="text-black font-semibold">Confirmar contraseña</label>
                    <Input type="password"  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="px-3 py-1 m-auto border  hover:bg-gray-200 rounded-md bg-white text-black font-semibold w-36 flex justify-center shadow-xl">Guardar</button>
                  </form>
      </div>
          </ModalContent>
        </Modal>
      </>
    )
  }