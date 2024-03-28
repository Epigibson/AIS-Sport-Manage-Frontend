import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payReceipt } from "../../api/ReceiptsService.jsx";
import { updatePaymentMethod } from "../../api/PaymentService.jsx";

export const usePayReceipt = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: payReceipt,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdatePaymentMethod,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset();
    },
  });
  return { mutateUpdatePaymentMethod, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
