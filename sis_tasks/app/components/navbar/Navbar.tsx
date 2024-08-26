import React from 'react'
import Logout from '../auth/Logout';
import Link from 'next/link';
import { Package2 } from 'lucide-react';
import { ChangePassword } from '../modal/ChangePassword';

const Navbar = async() => {


  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col bg-cyan-800  border-r border-cyan-400 bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <Link
        href={'/dashboard'}
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 className="h-7 w-7 transition-all text-white  group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      
      <Logout/>
     </nav>
  </aside>
  )
}

export default Navbar;