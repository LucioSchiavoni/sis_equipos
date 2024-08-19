-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "pcName" TEXT NOT NULL,
    "numSerie" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "autor" TEXT NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplicacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Aplicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoAplicacion" (
    "equipoId" INTEGER NOT NULL,
    "aplicacionId" INTEGER NOT NULL,
    "instalada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EquipoAplicacion_pkey" PRIMARY KEY ("equipoId","aplicacionId")
);

-- AddForeignKey
ALTER TABLE "EquipoAplicacion" ADD CONSTRAINT "EquipoAplicacion_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipoAplicacion" ADD CONSTRAINT "EquipoAplicacion_aplicacionId_fkey" FOREIGN KEY ("aplicacionId") REFERENCES "Aplicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
