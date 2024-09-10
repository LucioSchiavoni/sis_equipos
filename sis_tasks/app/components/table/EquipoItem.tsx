"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { DeleteEquipo } from "../modal/DeleteEquipos";
import { EditEqupo } from "../modal/EditEqupo";
import { downloadPDF, generatePDF } from "@/utils/generatePDF";

import { BsFiletypePdf } from "react-icons/bs";
import { FaCheckSquare, FaUserAlt } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import DateFormat from "@/utils/DateFormat";
import AplicacionesList from "../modal/AplicacionesList";
import { ScrollShadow } from "@nextui-org/scroll-shadow";


export function ExpandableCardDemo({ equipos }: { equipos: any[] }) {
  const [active, setActive] = useState<any | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const handleExport = async (equipo: any) => {
    const pdfBytes = await generatePDF(equipo);
    downloadPDF(pdfBytes, `Equipo-${equipo.pcName}.pdf`);
  };  


 
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  h-full  z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center  z-[100]">
            <motion.button
              key={`button-${active.pcName}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white  rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.pcName}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col glass bg-white rounded-xl  overflow-hidden"
            > 
              <div className="">
        
                <div className="flex justify-between items-start p-6 ">
                   
                  <div>

                    <motion.h3
                      layoutId={`title-${active.pcName}-${id}`}
                      className="font-bold uppercase text-black dark:text-neutral-200"
                    >
                      {active.pcName}
                    </motion.h3>
                         <motion.p
                      layoutId={`description-${active.numSerie}-${id}`}
                      className="text-neutral-900 dark:text-neutral-400"
                    >
                      N Serie: {active.numSerie}
                    </motion.p>
                  <motion.p
                      layoutId={`description-${active.unidad}-${active.numSerie}-${id}`}
                      className="text-neutral-900 flex items-center dark:text-neutral-400 text-center md:text-left"
                        >
                      <BsHouseFill/> Unidad: {active.unidad}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${active.autor}-${active.numSerie}-${id}`}
                      className="flex items-center text-neutral-900 dark:text-neutral-400"
                    >
                    <FaUserAlt/>Tecnico asignado: {active.autor}
                    </motion.p>
                  </div>
                </div>
                <div className="relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-xs md:text-sm lg:text-base pb-2 flex flex-col items-start  overflow-auto dark:text-black"
                  >
               
                               <h2 className="text-xl text-center font-semibold mb-2">Aplicaciones instaladas</h2>
             
       
            <ScrollShadow offset={100} orientation="horizontal" className="w-[450px] h-[200px] ">
              {
                active.aplicaciones.length > 0 ? (
                    active.aplicaciones.map((item: any,index: any) => (
                      <div className="flex gap-2 text-xl  items-center"><span><FaCheckSquare/></span>{item.aplicacion.nombre}</div>
                   
                    
                    ))
                
                  
               ) : <p>Sin aplicaciones instaladas</p>
                  }
                 </ScrollShadow>
                 <span className="mt-2">
                    <AplicacionesList data={active.aplicaciones} />
                 </span>
               
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-[600px] 3xl:w-[1600px] 2xl:w-[1600px] rounded-xl xl:w-[900px] gap-4 bg-cyan-800">
        {equipos.map((equipo) => (
          <motion.div
            layoutId={`card-${equipo.pcName}-${id}`}
            key={`card-${equipo.pcName}-${id}`}
            onClick={() => setActive(equipo)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-800 hover:bg-opacity-70 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            
            <div className="flex items-start  md:flex-row ">
              <div className="">
            
                <motion.h3
                  layoutId={`title-${equipo.pcName}-${id}`}
                  className="font-medium  uppercase text-white dark:text-white text-center md:text-left"
                >
                  {equipo.pcName}
                </motion.h3>
                <motion.p
                  layoutId={`description-${equipo.numSerie}-${id}`}
                  className="text-gray-300 px-2 dark:text-white text-center md:text-left"
                >
                  N: {equipo.numSerie}
                </motion.p>
             <motion.p
              layoutId={`description-${equipo.unidad}-${equipo.numSerie}-${id}`}
            className="flex items-center gap-1 px-2 text-gray-300 dark:text-white text-center md:text-left"
                >
                 <BsHouseFill/> {equipo.unidad}
                </motion.p>
                <motion.p
                  layoutId={`description-${equipo.autor}-${equipo.numSerie}-${id}`}
                  className="flex items-center px-2 gap-1 text-gray-300 dark:text-white text-center md:text-left"
                >
                   <FaUserAlt/> {equipo.autor}
                </motion.p>
              </div>
   
            </div>
            <div className="flex   flex-col h-24 gap-5">
   <div className="items-end">
                      <motion.p
                  layoutId={`description-${equipo.fecha}-${equipo.numSerie}-${id}`}
                  className="text-gray-300 px-2 dark:text-white   3xl:right-80"
                >
                  <DateFormat item={equipo.fecha}/>
                </motion.p>
      </div>
           
            <div className="flex justify-end items-end gap-4">
       
             <button className="mt-4 border px-3 hover:bg-gray-200 py-1 rounded-md bg-white text-black" onClick={() => handleExport(equipo)}> <span className="text-3xl"><BsFiletypePdf/></span></button>
               <EditEqupo id={equipo.id}/>

            {/* <DeleteEquipo id={equipo.id}/> */}
        </div>
            </div>
           
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
