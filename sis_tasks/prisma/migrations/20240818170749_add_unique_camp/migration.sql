/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Aplicacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pcName]` on the table `Equipo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numSerie]` on the table `Equipo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Aplicacion_nombre_key" ON "Aplicacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_pcName_key" ON "Equipo"("pcName");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_numSerie_key" ON "Equipo"("numSerie");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
