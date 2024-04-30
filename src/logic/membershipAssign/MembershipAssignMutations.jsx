import { useMutation } from "@tanstack/react-query";
import { toastNotify } from "../../utils/ToastNotify.jsx";
import {
  assignMembershipToAthlete,
  removeMembershipFromAthlete,
} from "../../api/AtheleService.jsx";

export const useAssignMembershipToAthleteMutation = (refreshData) => {
  const {
    mutate: mutateAssignMembershipToAthlete,
    isSuccess,
    isError,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: assignMembershipToAthlete,
    onSuccess: async () => {
      refreshData();
      toastNotify({
        type: "success",
        message: "Exito en el registro",
        description:
          "Se ha aregado correctamente la nueva membresia al atleta.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al crear registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return {
    mutateAssignMembershipToAthlete,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useRemoveMembershipToAthleteMutation = (refreshData) => {
  const {
    mutate: mutateRemoveMembershipToAthlete,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: removeMembershipFromAthlete,
    onSuccess: async () => {
      refreshData();
      toastNotify({
        type: "success",
        message: "Exito en el registro",
        description: "Se ha removido correctamente la membresia del atleta.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al crear registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateRemoveMembershipToAthlete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
