
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";

export default async function Home() {

 
    
  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
<div className="">
<h1 className="relative z-10 text-lg md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">Registro de equipos</h1>
</div>
  
   <div className="flex flex-col gap-2 mb-4 ">
    <Link className=" py-1 bg-neutral-800 text-white rounded-md text-2xl w-80 text-center hover:scale-110 transition-all " href={'/login'}>Login</Link>
      <Link className="px-3 py-1  bg-neutral-800 text-white rounded-md text-xl w-80 text-center  hover:scale-110 transition-all " href={'/register'}>Registro</Link>
   </div>
    
      <div className="w-[60rem] h-40 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </div>
    </main>
  );
}
