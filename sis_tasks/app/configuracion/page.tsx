"use client";

import { Input } from "@/components/ui/input";
import Navbar from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import { changePassword } from "../api/auth/actions/auth-actions";
import { auth } from "../api/auth/[...nextauth]/route";
import { useState } from "react";


export default async function ConfiguracionPage() {


  return (

    <div className="min-h-screen bg-neutral-900">
      <Navbar/>
      <div className="flex items-center justify-center py-24 flex-col ">
              <p className="text-xl">Configuracion </p>

      </div>

    </div>

  )
}
