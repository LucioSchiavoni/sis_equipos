import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'

export const signIn = async(username: string, password: string) => {

    if( !username || !password) return null;

    const user = await prisma.user.findUnique({where: {username}})

    if(!user){
        const dbUser = await createUser(username, password, username)
        return dbUser;
    }
    
    if(!bcrypt.compareSync(password, user.password ?? '')){
        return null
    }
    return user;
}


const createUser = async (username: string, password: string, name: string) => {
    
    const user = await prisma.user.create({
        data:{
            username: username,
            password: bcrypt.hashSync(password),
            name: name 
        }
    })
}