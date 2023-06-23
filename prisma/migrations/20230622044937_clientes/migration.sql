-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);
