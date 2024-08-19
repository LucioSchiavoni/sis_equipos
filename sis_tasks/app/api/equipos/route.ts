import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request:Request) {
    

    const {searchParams} = new URL(request.url)

    const take = searchParams.get('take') ?? '1';

    if (isNaN(+take)){
        return NextResponse.json({message: "No es un numero "})
    }

    const addEquipos = await prisma.equipo.findMany({
        take: +take
    })

    return NextResponse.json(addEquipos)
}


