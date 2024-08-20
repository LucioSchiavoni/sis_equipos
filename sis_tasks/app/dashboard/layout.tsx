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
    <div>
      <nav className="mt-5">
          <Navbar/> 
      </nav>
   
      {children}
    </div>
  );
}

