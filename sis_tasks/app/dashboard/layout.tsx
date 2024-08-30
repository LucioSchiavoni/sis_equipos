import {  redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";
import Navbar from "../components/navbar/Navbar";



export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if( !session?.user){
   return redirect("/login")
  }

  return (
    <div className="relative bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)] flex flex-col items-center justify-center antialiased">
      <nav className="">
          <Navbar/> 
      </nav>
   
      {children}

    </div>
  );
}

