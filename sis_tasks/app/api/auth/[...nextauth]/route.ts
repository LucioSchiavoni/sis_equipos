import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials"
import { signIn } from "../actions/auth-actions";
import NextAuth from "next-auth/next";

const prisma = new PrismaClient();


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Nombre de usuario", type: "text", placeholder: "nombre.apellido"},
        password: { label: "Contraseña", type: "password", placeholder: "******"},
      },
      authorize: async (credentials) => {
        
    const user = await signIn(credentials!.username, credentials!.password)
 
        if (!user) {

          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
    ],
    
    session:{
        strategy: 'jwt'
    },
    
    callbacks:{
        async signIn({user, account, profile, credentials}){

            return true;
        },

        async jwt({token, user, account, profile}){
          console.log({token})
          return token; 
        },

        async session({session, token, user}) {

          return session;
        },
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};