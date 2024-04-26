import { useMutation } from "@tanstack/react-query";
import {
  changeAvatar,
  createAthlete,
  deleteAthlete,
  updateAthlete,
  updateAthleteStatus,
} from "../../api/AtheleService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useCreateAthlete = (onSuccessCallback) => {
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createAthlete,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      onSuccessCallback();
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

export const useUpdateAthlete = (onSuccessCallback) => {
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updateAthlete,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Registro actualizado",
        description: "Se ha actualizado correctamente el registro.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al actualizar el registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useChangeAthleteStatus = (onSuccessCallback) => {
  const {
    mutate: mutateUpdateStatus,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updateAthleteStatus,
    onSuccess: async () => {
      onSuccessCallback();
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
        message: "Error al actualizar el registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdateStatus, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeleteAthlete = (onSuccessCallback) => {
  const {
    mutate: mutateDelete,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteAthlete,
    onSuccess: async () => {
      onSuccessCallback();
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
        message: "Error al eliminar el registro.",
        description: errorMessage,
      });
    },
  });
  return { mutateDelete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useChangeAvatar = (onSuccessCallback) => {
  const {
    mutateAsync: mutateUpdateAvatar,
    isSuccess,
    isError,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Avatar actualizado correctamente.",
        description: "Se ha actualizado correctamente el avatar.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Error al actualizar el avatar.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateUpdateAvatar, isSuccess, isError, isPending, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
