"use server";
import prisma from "@/app/lib/prisma";



export const createAplicaciones = async(nombre: string) => {
    try {
        const exist = await prisma.aplicacion.findFirst({where: {nombre: nombre}})
        if(exist){
            return {info:"Esta aplicacion ya existe"}
        }else{
        const res = await prisma.aplicacion.create({
            data:{
                nombre: nombre,
            }
        })
        return {success: "Nueva aplicacion agregada"} 
    }
    } catch (error) {
        console.log(error)
    }
}


export const getAplicaciones = async(): Promise<any[]> => {
    try {
        return await prisma.aplicacion.findMany()
    } catch (error) {
       console.error("Error al obtener aplicaciones", error); 
    throw error; 
    }
}


export const getAplicacionesById = async(equipoId:string): Promise<any> => {
    try {
        return await prisma.aplicacion.findMany({where:{equipos:{
            some:{
                equipoId: +equipoId
            }
        }}})
    } catch (error) {
        console.log(error)
    }
}