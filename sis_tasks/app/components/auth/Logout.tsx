'use client';

import { useSession, signIn, signOut } from "next-auth/react";

const Logout = () => {

    const {data: session, status} = useSession();

    if(status === 'loading'){
        return (
            <button className="px-4 py-1 flex items-center space-x-4 rounded-md border">Cargando...</button>
        )
    }

       if(status === "unauthenticated"){
        return (
            <button onClick={ () => signIn()} className="px-4 py-1 flex items-center space-x-4 rounded-md border">Login</button>
        )
    }

         if(status === "authenticated"){
        return (
            <button onClick={ () => signOut()} className="px-4 py-1 flex items-center space-x-4 rounded-md border">Cerrar session</button>
        )
    }
}

export default Logout