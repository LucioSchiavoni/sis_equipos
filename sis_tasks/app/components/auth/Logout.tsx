'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

const Logout = () => {

    const {data: session, status} = useSession();

    if(status === 'loading'){
        return (
            <button className="px-4 py-1 flex items-center space-x-4 rounded-md border text-white">Cargando...</button>
        )
    }

       if(status === "unauthenticated"){
        return (
            <button onClick={ () => signIn()} className="px-4 py-1 flex items-center space-x-4 rounded-md border text-white">Login</button>
        )
    }

         if(status === "authenticated"){
        return (
            <button onClick={ () => signOut()} className=" px-1 flex items-center  rounded-md  text-white h-10 hover:bg-gray-800 transition-all text-3xl"><TbLogout/></button>
        )
    }
}

export default Logout