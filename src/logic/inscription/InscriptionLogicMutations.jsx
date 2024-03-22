import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inscribeUser } from "../../api/InscriptionService.jsx";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useInscription = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: inscribeUser,
    onSuccess: async (data) => {
      console.log("Mutación exitosa", data);
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
      await navigate("/users");
      // Verificar si data.init_point existe y no es undefined antes de redireccionar
      // if (data.init_point) {
      //   window.location.href = data.init_point;
      // } else {
      //   // Manejar el caso donde data.init_point no está disponible
      //   console.error("URL de redirección no disponible.");
      // }
      toastNotify({
        type: "success",
        message: "Correcto",
        description: "Se ha realizado correctamente la inscripción.",
      });
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado
    },
    onError: (error) => {
      console.error("Error en la mutación", error.response.data.detail);
      toastNotify({
        type: "error",
        message: "Inscripción fallida",
        description: "No se ha podido relizar correctamete la inscripción.",
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateCreate, isSuccess, isError, isPending, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
