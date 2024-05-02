import { useMutation } from "@tanstack/react-query";
import { toastNotify } from "../../utils/ToastNotify.jsx";
import {
  createDiscount,
  deleteDiscount,
  updateDiscount,
} from "../../api/DiscountService.jsx";

export const useCreateDiscount = (onSuccessAction) => {
  const {
    mutate: mutateCreateDiscount,
    isSuccess,
    isError,
    isPending: isPendingCreatingDiscount,
    error,
    reset,
  } = useMutation({
    mutationFn: createDiscount,
    onSuccess: async () => {
      onSuccessAction();
      toastNotify({
        type: "success",
        message: "Registro creado",
        description: "Se ha creado correctamente el registro.",
      });
    },
    onError: (error) => {
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
    mutateCreateDiscount,
    isSuccess,
    isError,
    isPendingCreatingDiscount,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdateDiscount = (onSuccessAction) => {
  const {
    mutate: mutateUpdateDiscount,
    isSuccess,
    isError,
    isPending: isPendingUpdatingDiscount,
    error,
    reset,
  } = useMutation({
    mutationFn: updateDiscount,
    onSuccess: async () => {
      onSuccessAction();
      toastNotify({
        type: "success",
        message: "Registro actualizado",
        description: "Se ha actualizado correctamente el registro.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al actualizar registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return {
    mutateUpdateDiscount,
    isSuccess,
    isError,
    isPendingUpdatingDiscount,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeleteDiscount = (onSuccessAction) => {
  const {
    mutate: mutateDeleteDiscount,
    isSuccess,
    isError,
    isPending: isPendingDeletingDiscount,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteDiscount,
    onSuccess: async () => {
      onSuccessAction();
      toastNotify({
        type: "success",
        message: "Registro eliminado",
        description: "Se ha eliminado correctamente el registro.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al eliminar registro.",
        description: errorMessage,
      });
    },
  });
  return {
    mutateDeleteDiscount,
    isSuccess,
    isError,
    isPendingDeletingDiscount,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};
