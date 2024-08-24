-- DropForeignKey
ALTER TABLE "EquipoAplicacion" DROP CONSTRAINT "EquipoAplicacion_aplicacionId_fkey";

-- DropForeignKey
ALTER TABLE "EquipoAplicacion" DROP CONSTRAINT "EquipoAplicacion_equipoId_fkey";

-- AddForeignKey
ALTER TABLE "EquipoAplicacion" ADD CONSTRAINT "EquipoAplicacion_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipoAplicacion" ADD CONSTRAINT "EquipoAplicacion_aplicacionId_fkey" FOREIGN KEY ("aplicacionId") REFERENCES "Aplicacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
