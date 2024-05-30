import ExcelJS from "exceljs";

export const exportToExcel = async (data, filename) => {
  const requiredFields = [
    "tuition",
    "name",
    "gender",
    "age",
    "is_inscribed",
    "status",
    "tutors_name_one",
    "tutors_name_two",
    "sport_preference",
    "groups",
    "start_date",
    "products_which_inscribed",
    "email",
    "phone",
    "mobile",
  ];

  const columnHeaders = {
    tuition: "Matrícula",
    name: "Nombre",
    gender: "Género",
    age: "Edad",
    is_inscribed: "Está Inscrito",
    status: "Estatus",
    tutors_name_one: "Nombre del Tutor Uno",
    tutors_name_two: "Nombre del Tutor Dos",
    sport_preference: "Preferencia Deportiva",
    groups: "Grupos",
    start_date: "Fecha de Inicio",
    products_which_inscribed: "Membresias",
    email: "Correo Electrónico",
    phone: "Teléfono",
    mobile: "Móvil",
  };

  const formattedData = data.map((item) => {
    const formattedItem = {};
    requiredFields.forEach((field) => {
      if (field === "groups") {
        formattedItem[field] = Array.isArray(item[field])
          ? item[field].map((group) => group.name).join(", ")
          : "N/A";
      } else if (field === "hobbies" || field === "products_which_inscribed") {
        formattedItem[field] = Array.isArray(item[field])
          ? item[field].map((obj) => obj.name).join(", ")
          : "N/A";
      } else if (field === "is_inscribed") {
        formattedItem[field] = item[field] ? "Inscrito" : "No Inscrito";
      } else if (field === "status") {
        formattedItem[field] = item[field] ? "Activo" : "Inactivo";
      } else {
        formattedItem[field] = item[field] !== undefined ? item[field] : "N/A";
      }
    });
    return formattedItem;
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Atletas");

  // Agregar fila de encabezado personalizada
  const headers = requiredFields.map((field) => columnHeaders[field] || field);
  worksheet.addRow(headers);

  // Aplicar estilos a la cabecera
  worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4F81BD" },
  };
  worksheet.getRow(1).alignment = { horizontal: "center" };

  // Agregar datos
  formattedData.forEach((item) => {
    worksheet.addRow(Object.values(item));
  });

  // Aplicar auto filtro
  worksheet.autoFilter = {
    from: "A1",
    to: "O1",
  };

  // Ajustar el ancho de las columnas
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  // Guardar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.xlsx`;
  link.click();
};
