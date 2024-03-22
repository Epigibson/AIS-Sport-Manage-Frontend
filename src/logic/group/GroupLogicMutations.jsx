import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "../../api/GroupService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useCreateGroup = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createGroup,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allGroups"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Registro creado",
        description: "Se ha creado correctamente el registro.",
      });
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: "Error al crear registro.",
        description: "No se ha podido crear correctamente el registro.",
      });
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateCreate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updateGroup,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allGroups"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Registro actualizado",
        description: "Se ha actualizado correctamente el registro.",
      });
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: "Error al actualizar registro.",
        description: "No se ha podido actualizar correctamente el registro.",
      });
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateDelete,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allGroups"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Registro eliminado",
        description: "Se ha eliminado correctamente el registro.",
      });
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: "Error al eliminar registro.",
        description: "No se ha podido eliminar correctamente el registro.",
      });
      console.error("Error en la mutación", error);
    },
  });
  return { mutateDelete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
