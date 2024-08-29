"use server";
import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'



export const signInCredentials = async(username: string, password: string) => {

    if( !username || !password) return null;

    const user = await prisma.user.findUnique({where: {username}})

    if(!user){
        console.log("Usuario no encontrado")
    }
    
    if(!bcrypt.compareSync(password, user?.password ?? '')){
        return null
    }
    return user;
}


export const createUser = async (username: string, password: string, name: string) => {
    try {

      const existUser = await prisma.user.findUnique({where: {username}})
             if(existUser){
                return null
             }
        const user = await prisma.user.create({
        data:{
            username: username,
            password: bcrypt.hashSync(password),
            name: name 
        }
    })
        return user;
    } catch (error) {
        throw new Error('Error al crear usuario');
    }

}


export const changePassword = async (password: string, id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!user) {
        return { error: "Usuario no encontrado." };
      }
  
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: password,
        },
      });
  
      return { success: "Contraseña cambiada con éxito" };
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return { error: "Hubo un error al cambiar la contraseña." };
    }
  };
  