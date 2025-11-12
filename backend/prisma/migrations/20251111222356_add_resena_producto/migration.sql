-- CreateTable
CREATE TABLE "ReseñaProducto" (
    "id_producto" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valoracion" INTEGER NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "ReseñaProducto_pkey" PRIMARY KEY ("id_producto","fecha")
);

-- AddForeignKey
ALTER TABLE "ReseñaProducto" ADD CONSTRAINT "ReseñaProducto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
