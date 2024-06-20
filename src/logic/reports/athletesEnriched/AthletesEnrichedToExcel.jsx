import * as XLSX from "xlsx";
import dayjs from "dayjs";

export const exportAthletesToExcel = (athletesEnriched) => {
  // Transformar los datos para que cada fila corresponda a un recibo
  const transformedData = athletesEnriched.flatMap((athlete) => {
    return athlete.payments.map((payment) => ({
      Matrícula: athlete.tuition,
      Nombre: athlete.name,
      Estatus: athlete.status ? "Activo" : "Inactivo",
      "Está Inscrito": athlete.is_inscribed ? "Sí" : "No",
      "Nombre del Paquete del Recibo": payment.receipt_id
        ? payment.receipt_id.receipt_package_name
        : "",
      "Monto del Recibo": payment.receipt_id
        ? payment.receipt_id.receipt_amount
        : "",
      "Estatus del Recibo": payment.receipt_id
        ? payment.receipt_id.receipt_status
        : "",
      "Descripción del Recibo": payment.receipt_id
        ? payment.receipt_id.receipt_description
        : "",
      "Método de Pago": payment.payment_method,
      "Fecha de Creación del Pago": payment.created_at,
      "Fecha en que se pagó": payment.receipt_id.updated_at,
    }));
  });

  // Crear la hoja de trabajo con los datos transformados
  const worksheet = XLSX.utils.json_to_sheet(transformedData);

  // Añadir la fila de encabezado con nombres en español
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "Matrícula",
        "Nombre",
        "Estatus",
        "Está Inscrito",
        "Nombre del Paquete del Recibo",
        "Monto del Recibo",
        "Estatus del Recibo",
        "Descripción del Recibo",
        "Método de Pago",
        "Fecha de Creación del Pago",
        "Fecha en que se pagó",
      ],
    ],
    { origin: "A1" },
  );

  // Ajustar el ancho de las columnas
  worksheet["!cols"] = [
    { wch: 20 }, // Matrícula
    { wch: 30 }, // Nombre
    { wch: 10 }, // Estatus
    { wch: 15 }, // Está Inscrito
    { wch: 30 }, // Nombre del Paquete del Recibo
    { wch: 15 }, // Monto del Recibo
    { wch: 20 }, // Estatus del Recibo
    { wch: 30 }, // Descripción del Recibo
    { wch: 20 }, // Método de Pago
    { wch: 25 }, // Fecha de Creación del Pago
    { wch: 25 }, // Fecha en que se pagó
  ];

  // Aplicar estilo a las cabeceras
  const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      fill: {
        fgColor: { rgb: "000080" }, // Azul marino
      },
      font: {
        color: { rgb: "FFFFFF" }, // Blanco
        bold: true,
      },
    };
  }

  // Aplicar filtro a las cabeceras
  worksheet["!autofilter"] = { ref: `A1:K${transformedData.length + 1}` };

  // Crear el libro de trabajo y añadir la hoja de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ingresos");

  // Escribir el archivo Excel
  XLSX.writeFile(
    workbook,
    `reporte_de_ingresos_${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`,
  );
};
