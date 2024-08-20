import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials"
import { signInCredentials } from "../actions/auth-actions";
import NextAuth from "next-auth";
import { signInSchema } from "@/app/lib/zod";
import { ZodError } from "zod";

const prisma = new PrismaClient();


export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Credentials({
          name:"Credentials",
      credentials: {
        username: { label: "Nombre de usuario", type: "text", placeholder: "nombre.apellido"},
        password: { label: "Contraseña", type: "password", placeholder: "******"},
      },
      authorize: async (credentials) => {
        try {
           let user = null

        const {username, password} = await signInSchema.parseAsync(credentials)
         user = await signInCredentials(username, password)
 
        if (!user) {
          console.log('no se encuentra el usuario')
          throw new Error("User not found.")
        }
 
        return user
        } catch (error) {
          if(error instanceof ZodError){
            return null
          }
        }
       
      },
    }),
    ],
    
    session:{
        strategy: 'jwt'
    },
    pages:{
      signIn: "/login"
    },
    
    callbacks:{
        async signIn({user, account, profile, credentials}){
           
            return true;
        },

        async jwt({token, user, account, profile}){
    
          return token; 
        },

        async session({session, token, user}) {
  
          return session;
        },
    }
})


export const {GET, POST} = handlers;