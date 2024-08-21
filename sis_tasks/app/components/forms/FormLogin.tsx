'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { CardBody, CardContainer, CardItem } from "../../../components/ui/3d-card";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
        redirect:false,
      username,
      password,
    },
);

    if (result?.error) {
      setError(result?.error);
    }else{
        router.push("/dashboard")
    }
  };

  return (
   
       <CardContainer className="inter-var shadow-2xl rounded-md">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-md p-10 border  flex justify-center items-center">
        <CardItem
          translateZ="100"
          className="text-xl  text-neutral-700 dark:text-white"
        >

      <form onSubmit={handleSubmit} className="space-y-12 ">
            <div className="space-y-2">
              <label>Username</label>
         
                <Input placeholder="nombre.apellido" className="text-xl" value={username} onChange={(e) => setUsername(e.target.value)} />
       
          
            
            </div>
               <div className="space-y-2">
              <label>Password</label>
           
                <Input placeholder="*******" type="password" className="text-xl" value={password} onChange={(e) => setPassword(e.target.value)} />
              
           <span className="text-red-400 ">
             <p className="mt-4 px-4 font-">{error ? error : null}</p>  
              </span>
            </div>
    
    
        <Button type="submit" className="w-52 text-xl">Ingresar</Button>
      </form>
</CardItem>
</CardBody>
</CardContainer>

  );
};

export default LoginForm;

   
