"use server";

import prisma from "@/app/lib/prisma";





export const createEquipo = async(data: any) => {

  const { pcName, numSerie, unidad, autor, aplicaciones } = data;
    try {
    const existPcName = await prisma.equipo.findFirst({where:{ pcName: pcName }})

    const existNumSerie = await prisma.equipo.findFirst({where:{numSerie:numSerie}})

    if(existPcName){
        return {error:"Este nombre de PC ya esta registrado"}
    }else if(existNumSerie){
        return{error :"Este numero de serie ya esta registrado"}
    }
    
        const equipo = await prisma.equipo.create({
        data: {
          pcName,
          numSerie,
          fecha: new Date().toISOString(),
          unidad,
          autor,
         aplicaciones: {
            create: 
            aplicaciones.map((app: any) => ({
                aplicacionId: app.aplicacionId,
                instalada: app.instalada
            }))
},
        },
    })

    return {success:"Equipo registrado con exito"};
    } catch (error) {
        console.log(error)
    }
}


export const getEquipos = async(): Promise<any[]> => {
    try {
        return await prisma.equipo.findMany({
            include:{
                aplicaciones: {
                    select:{
                        instalada: true,
                        aplicacion:{
                            select:{
                                nombre:true
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.log(error)
            throw error; 
    }
}


export const deleteEquipo = async(id: number) => {
    try {
        const res = await prisma.equipo.delete({where:{id:id}})
        return {success: "Equipo eliminado"}
    } catch (error) {
        console.log(error)
    }
}


export const editEquipo = async(id: number, data: any) => {
    try {
         const currentData = await prisma.equipo.findUnique({
      where: { id }
    });
          if (!currentData) {
      throw new Error("Equipo no encontrado");
    }
        const updatedData = {
      ...currentData, 
      ...data 
    };

        const res =  await prisma.equipo.update({
            where: {id},
            data: updatedData
        })
        return {success: "Se guardaron los cambios"}
    } catch (error) {
        console.log(error)
    }
}