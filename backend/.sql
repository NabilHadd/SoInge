CREATE TABLE administrador (
  rut_admin VARCHAR(20) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  imagen BYTEA NOT NULL
);

CREATE TABLE compra (
  id_compra SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  total DECIMAL(10,2) NOT NULL,
  rut_comprador VARCHAR(20) NOT NULL,
  rut_admin VARCHAR(20) NOT NULL REFERENCES administrador(rut_admin)
);

CREATE TABLE detalle_compra (
  id_detalle INT NOT NULL,
  id_compra INT NOT NULL REFERENCES compra(id_compra),
  id_producto INT NOT NULL REFERENCES producto(id_producto),
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_detalle, id_compra, id_producto)
);

CREATE TABLE historial_stock (
  id_movimiento SERIAL PRIMARY KEY,
  id_producto INT NOT NULL REFERENCES producto(id_producto),
  variacion INT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE log_admin (
  id_log SERIAL PRIMARY KEY,
  rut_admin VARCHAR(20) NOT NULL REFERENCES administrador(rut_admin),
  accion VARCHAR(255) NOT NULL,
  fecha TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- FUNCION Y TRIGGER PARA HISTORIAL STOCK
-- ====================================

CREATE OR REPLACE FUNCTION fn_actualizar_stock()
RETURNS TRIGGER AS $$
DECLARE
    variacion_stock INT;
    descripcion_mov VARCHAR(255);
BEGIN
    -- Calculamos la variación
    variacion_stock := NEW.stock - OLD.stock;

    -- Solo registrar si hubo cambio
    IF variacion_stock <> 0 THEN
        -- Descripción automática
        IF variacion_stock > 0 THEN
            descripcion_mov := 'Se compraron insumos';
        ELSE
            descripcion_mov := 'Stock ajustado';
        END IF;

        -- Insertamos en historial_stock
        INSERT INTO historial_stock(id_producto, variacion, fecha, descripcion)
        VALUES (NEW.id_producto, variacion_stock, NOW(), descripcion_mov);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_stock
AFTER UPDATE OF stock ON producto
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_stock();



-- vaciar tablas

TRUNCATE TABLE log_admin,
               historial_stock,
               detalle_compra,
               compra,
               producto,
               administrador
RESTART IDENTITY CASCADE;


-- eliminar tablas
DROP TABLE IF EXISTS log_admin,
                     historial_stock,
                     detalle_compra,
                     compra,
                     producto,
                     administrador
CASCADE;