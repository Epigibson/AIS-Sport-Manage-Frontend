import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inscribeUser } from "../../api/InscriptionService.jsx";

export const useInscription = () => {
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
      // window.location.href = data?.init_point;
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateCreate, isSuccess, isError, isPending, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
