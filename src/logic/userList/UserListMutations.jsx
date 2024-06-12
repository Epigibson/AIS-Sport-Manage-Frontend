import { useMutation } from "@tanstack/react-query";
import { toastNotify } from "../../utils/ToastNotify.jsx";
import {
  addBalanceToUser,
  subtractBalanceToUser,
} from "../../api/UserService.jsx";

export const useAddBalance = (onSuccessCallback) => {
  const {
    mutate: mutateAddBalance,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: addBalanceToUser,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha editado correctamente el balance.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message || "No se ha podido actualizar correctamente el balance.";
      toastNotify({
        type: "error",
        message: "No se pudo crear el registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateAddBalance, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useSubtractBalance = (onSuccessCallback) => {
  const {
    mutate: mutateSubtractBalance,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: subtractBalanceToUser,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha editado correctamente el balance.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message || "No se ha podido actualizar correctamente el balance.";
      toastNotify({
        type: "error",
        message: "No se pudo crear el registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateSubtractBalance, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
