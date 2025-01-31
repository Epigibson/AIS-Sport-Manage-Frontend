import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeUserAvatar, createCouch, deleteUser, updateUser,} from "../../api/UserService.jsx";
import {toastNotify} from "../../utils/ToastNotify.jsx";

/**
 * @property {string} message
 */

export const useCreateCouch = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createCouch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["couchList"] }); // Invalidar la consulta "allPackages"
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Registro creado",
        description: "Se ha creado correctamente el registro.",
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
      reset();
    },
  });
  return { mutateCreate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdateCouch = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Registro actualizado",
        description: "Se ha actualizado correctamente el registro.",
      });
      await queryClient.invalidateQueries({ queryKey: ["couchList"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
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
      reset();
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdateAvatarCouch = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdateAvatar,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: changeUserAvatar,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Registro actualizado",
        description: "Se ha actualizado correctamente el registro.",
      });
      await queryClient.invalidateQueries({ queryKey: ["couchList"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
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
      reset();
    },
  });
  return { mutateUpdateAvatar, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeleteCouch = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateDelete,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["couchList"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Registro eliminado",
        description: "Se ha podido eliminar correctamente el registro.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
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
  return { mutateDelete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
