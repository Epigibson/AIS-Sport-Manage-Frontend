import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPackage, updatePackage } from "../../api/ProductService.jsx";

export const useCreatePackage = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      console.log("Mutación exitosa");
      queryClient.invalidateQueries({ queryKey: ["allPackages"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: updatePackage,
    onSuccess: () => {
      console.log("Mutación exitosa");
      queryClient.invalidateQueries({ queryKey: ["allPackages"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
