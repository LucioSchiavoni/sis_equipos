"use server";
import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'


export const signInCredentials = async(username: string, password: string) => {

    if( !username || !password) return null;

    const user = await prisma.user.findUnique({where: {username}})

    if(!user){
        // const dbUser = await createUser(username, password, username)
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
                throw new Error("Usuario ya existe")
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