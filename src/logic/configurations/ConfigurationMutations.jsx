import { useMutation } from "@tanstack/react-query";
import { editConfiguration } from "../../api/ConfigurationsService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useEditConfiguration = (onSuccessCallback) => {
  const {
    mutate: mutateEditConfiguration,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editConfiguration,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha editado correctamente la configuracion.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "No se ha podido crear correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateEditConfiguration, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
