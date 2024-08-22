export interface Equipos {
  pcName: string;
  numSerie: string;
  unidad: string;
  autor: string;
  nombre: string;
  equipoId: string;
  aplicaciones: {
    aplicacionId: number;
    instalada: boolean;
  }[];
}


export interface EquiposTable {
    pcName: string;
  numSerie: string;
  unidad: string;
  autor: string;
   aplicaciones: {
    aplicacionId: number;
    instalada: boolean;
  }[];
}