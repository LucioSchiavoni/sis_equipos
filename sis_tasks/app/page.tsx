
import Link from "next/link";


export default async function Home() {

 
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">

   <h1 className="text-center text-3xl">El home</h1>
    <Link className="px-3 py-2  bg-neutral-800 text-white rounded-md text-xl w-24 text-center absolute left-20 top-10 hover:scale-110 transition-all " href={'/login'}>Login</Link>

      <Link className="px-3 py-2  bg-neutral-800 text-white rounded-md text-xl w-24 text-center absolute left-52 top-10 hover:scale-110 transition-all " href={'/register'}>Registro</Link>
    </main>
  );
}
