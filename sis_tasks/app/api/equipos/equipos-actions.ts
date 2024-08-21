import prisma from "@/app/lib/prisma";



export const createEquipo = async(data: any) => {
    try {
        const res = await prisma.equipo.create({
            data
        })
    } catch (error) {
        console.log(error)
    }
}