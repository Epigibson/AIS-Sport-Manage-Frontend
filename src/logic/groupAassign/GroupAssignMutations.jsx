import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  assignUserToGroup,
  removeUserFromGroup,
} from "../../api/GroupService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const GroupAssignMutations = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: assignUserToGroup,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["currentAthlete"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Exito en el registro",
        description: "Se ha aregado correctamente el atleta al grupo.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateCreate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const GroupRemoveMutations = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateRemove,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: removeUserFromGroup,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["currentAthlete"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Exito al eliminar",
        description: "Se ha eliminado correctamente el registro.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
  });
  return { mutateRemove, isSuccess, isError, error, reset };
};
