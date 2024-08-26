// auth.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInCredentials } from "../actions/auth-actions";
import { signInSchema } from "@/app/lib/zod";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Nombre de usuario", type: "text", placeholder: "nombre.apellido" },
        password: { label: "Contraseña", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        try {
        
          let user = null;
          const { username, password } = await signInSchema.parseAsync(credentials);
          user = await signInCredentials(username, password);
          
          if (!user) {
            throw new Error("User not found.")
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
});


export const { GET, POST } = handlers;
