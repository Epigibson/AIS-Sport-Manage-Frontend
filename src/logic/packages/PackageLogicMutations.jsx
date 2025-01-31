import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPackage,
  deletePackage,
  updatePackage,
} from "../../api/ProductService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useCreatePackage = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createPackage,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allPackages"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
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
  return { mutateCreate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updatePackage,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allPackages"] }); // Invalidar la consulta "allPackages"
      toastNotify({
        type: "success",
        message: "Registro actualizado correctamente.",
        description: "Se ha actualizado correctamente el Paquete.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "No se pudo actualizar el registro.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateDelete,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deletePackage,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allPackages"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "No se pudo eliinar el registro.",
        description: errorMessage,
      });
    },
  });
  return { mutateDelete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
