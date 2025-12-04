import psycopg2
import pandas as pd
import os

# ====== CONFIGURACION ======
DB_CONFIG = {
    "dbname": "soinge",
    "user": "postgres",
    "password": "123",
    "host": "localhost",
    "port": "5433"
}

CSV_PATH = "productos.csv"
IMAGES_DIR = "imagenes"  # carpeta donde están las imágenes
# ===========================


def conectar_bd():
    return psycopg2.connect(**DB_CONFIG)


def leer_imagen(ruta):
    with open(ruta, "rb") as f:
        return f.read()


def main():
    # Leer CSV
    df = pd.read_csv(CSV_PATH, sep='\t')

    # Conexión
    conn = conectar_bd()
    cur = conn.cursor()

    # Aseguramos que hay la misma cantidad de imágenes que filas
    imagenes = sorted(os.listdir(IMAGES_DIR))
    if len(imagenes) < len(df):
        print("Faltan imágenes, se insertarán solo las coincidentes.")


    for i, row in df.iterrows():
        try:

            imagen_match = [x for x in imagenes if x.split('.')[0] == row["nombre"]]
            if not imagen_match:
                print(f"No se encontró imagen para {row['nombre']}")
                continue
            img_path = os.path.join(IMAGES_DIR, imagen_match[0])
            imagen_bytes = leer_imagen(img_path)


            cur.execute("""
                INSERT INTO "Producto" (nombre, descripcion, precio, stock, imagen)
                VALUES (%s, %s, %s, %s, %s)
            """, (
                row["nombre"],
                row["descripcion"],
                row["precio"],
                row["stock"],
                psycopg2.Binary(imagen_bytes)
            ))

        except Exception as e:
            print(f"Error en fila {i}: {e}")


    conn.commit()

    cur.close()
    conn.close()
    print("✅ Productos insertados correctamente.")


if __name__ == "__main__":
    main()