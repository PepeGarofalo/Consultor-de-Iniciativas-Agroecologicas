import * as XLSX from "xlsx";

export const exportToXLSX = (iniciativas) => {
  // Crea una hoja de cálculo vacía
  const workbook = XLSX.utils.book_new();

  // Convierte tus datos de iniciativas en un arreglo de arreglos
  const data = iniciativas.map((iniciativa) => [
    iniciativa.nombre_iniciativa,
    iniciativa.tematica,
    iniciativa.propietario,
    iniciativa.hectareas,
    iniciativa.direccion,
    iniciativa.nombre_provincia,
    iniciativa.nombre_municipio,
    iniciativa.latitud,
    iniciativa.longitud,
    iniciativa.contacto,
    iniciativa.telefonos,
    iniciativa.correo,
    iniciativa.redes,
  ]);

  // Crea una hoja de cálculo a partir de los datos
  const worksheet = XLSX.utils.aoa_to_sheet([[
    "Nombre de Iniciativa",
    "Tematica",
    "Propietario",
    "Hectáreas",
    "Dirección",
    "Provincia",
    "Municipio",
    "Latitud",
    "Longitud",
    "Contacto",
    "Teléfonos",
    "Correo",
    "Redes",
    /* Agrega más encabezados aquí */
  ], ...data]);

  // Agrega la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Iniciativas");

  // Crea un archivo XLSX
  XLSX.writeFile(workbook, "iniciativas.xlsx");
};
