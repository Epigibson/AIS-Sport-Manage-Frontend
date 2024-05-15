export const GetColorByStatus = (status) => {
  switch (status) {
    case "Pagado":
      return "green";
    case "Pendiente":
    case "Creado": // Asegúrate de que "Creado" es un estado válido en tu caso
      return "yellow";
    case "Cancelado":
      return "red";
    default:
      return "grey"; // Usa gris como color predeterminado para estados no reconocidos
  }
};
