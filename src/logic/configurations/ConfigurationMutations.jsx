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
        message: "Éxito!.",
        description: "Se ha editado correctamente la configuración.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "No se ha podido crear correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Acción no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset();
    },
  });
  return { mutateEditConfiguration, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
