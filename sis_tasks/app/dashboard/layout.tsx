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
    <div className="  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <nav className="">
          <Navbar/> 
      </nav>
   
      {children}

    </div>
  );
}

