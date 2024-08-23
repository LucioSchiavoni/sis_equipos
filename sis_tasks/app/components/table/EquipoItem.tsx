"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";

export function ExpandableCardDemo({ equipos }: { equipos: any[] }) {
  const [active, setActive] = useState<any | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white  dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            > 
              <div className="">
        
                <div className="flex justify-between items-start p-4">
                   
                  <div>
               
                    <motion.h3
                      layoutId={`title-${active.pcName}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.pcName}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.numSerie}-${id}`}
                      className="text-neutral-900 dark:text-neutral-400"
                    >
                      Unidad: {active.unidad}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${active.autor}-${id}`}
                      className="text-neutral-900 dark:text-neutral-400"
                    >
                      Autor: {active.autor}
                    </motion.p>
                  </div>
                  <div className="flex gap-3">
                     <button className="text-black border px-2 py-1 rounded-md flex items-center text-xl"><span><TiEdit/>
                    </span> </button>
                    <button className="text-black border px-2 py-1 rounded-md flex items-center text-xl"><span><MdOutlineDelete/>
                    </span> </button>
                  </div>
                 
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start  overflow-auto dark:text-black"
                  >
                
                        <h3 className="text-xl font-medium mb-3">Aplicaiones instaladas</h3>
                    
                    
              {
          
                
          
                active.aplicaciones.length > 0 ? (
                  
                    active.aplicaciones.map((item: any, index: number) => (
                    <div key={index} className="">
                    {item.instalada ? (
                    <p className="font-medium">{item.aplicacion.nombre}</p>
                        ) : null}
                    </div>
                    ))
                ) : null
                  }
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="  w-[1600px] gap-4">
        {equipos.map((equipo) => (
          <motion.div
            layoutId={`card-${equipo.pcName}-${id}`}
            key={`card-${equipo.pcName}-${id}`}
            onClick={() => setActive(equipo)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-800 hover:bg-opacity-70 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            
            <div className="flex gap-4 flex-col md:flex-row">
              <div>
                <motion.h3
                  layoutId={`title-${equipo.pcName}-${id}`}
                  className="font-medium text-white dark:text-white text-center md:text-left"
                >
                  {equipo.pcName}
                </motion.h3>
                <motion.p
                  layoutId={`description-${equipo.numSerie}-${id}`}
                  className="text-gray-400 dark:text-white text-center md:text-left"
                >
                  Número de serie: {equipo.numSerie}
                </motion.p>
                <motion.p
                  layoutId={`description-${equipo.unidad}-${id}`}
                  className="text-gray-400 dark:text-white text-center md:text-left"
                >
                  Unidad: {equipo.unidad}
                </motion.p>
                <motion.p
                  layoutId={`description-${equipo.autor}-${id}`}
                  className="text-gray-400 dark:text-white text-center md:text-left"
                >
                  Autor: {equipo.autor}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${equipo.autor}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gray-300 hover:text-black text-black mt-4 md:mt-0"
            >
              Ver detalles
            </motion.button>
           
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
