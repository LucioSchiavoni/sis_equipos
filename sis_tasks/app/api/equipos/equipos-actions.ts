"use server";

import prisma from "@/app/lib/prisma";





export const createEquipo = async(data: any) => {

  const { pcName, numSerie, unidad, autor, aplicaciones } = data;
    try {
        const lastPcName = await prisma.equipo.findFirst({
            where: {
              pcName: {
                startsWith: pcName, 
              },
            },
            orderBy: {
              pcName: 'desc', // Ordenar por pcName en orden descendente para obtener el más alto
            },
          });
        
    const existNumSerie = await prisma.equipo.findFirst({where:{numSerie:numSerie}})
     
    let generateNum = "001";
    
      if (lastPcName) {
        const match = lastPcName.pcName.match(/-(\d{3})$/); 
        if (match) {
          const lastNum = parseInt(match[1], 10); 
          generateNum = (lastNum + 1).toString().padStart(3, '0'); 
        }
      }
    if(existNumSerie){
        return{error :"Este numero de serie ya esta registrado"}
    }
    
    const pcNameConcat = `${pcName}-${generateNum}`;

        const equipo = await prisma.equipo.create({
        data: {
        pcName: pcNameConcat,
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


export const getEquipos = async (query: string = '', page: number = 1, limit: number = 5): Promise<any[]> => {
    try {
        const offset = (page - 1)* limit;
        return await prisma.equipo.findMany({
            where: {
                OR: [
                    {
                        pcName: {
                            contains: query,
                            mode: 'insensitive',  
                        },
                    },
                    {
                        numSerie: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            skip: offset,
            take: limit,
            orderBy:{
                fecha: "desc"
            },
            include: {
                aplicaciones: {
                    select: {
                        instalada: true,
                        aplicacion: {
                            select: {
                                nombre: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};





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