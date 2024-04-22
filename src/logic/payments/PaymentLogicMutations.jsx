import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelReceipt,
  payReceipt,
  revertReceipt,
} from "../../api/ReceiptsService.jsx";
import {
  editHistoryPaymentAmount,
  editHistoryPaymentExtension,
  updatePaymentMethod,
} from "../../api/PaymentService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

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
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha confirmado correctamente el pago.",
      });
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useCancelReceipt = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateUpdateCancelReceipt,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: cancelReceipt,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha cancelado correctamente el recibo.",
      });
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateUpdateCancelReceipt, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useRevertReceipt = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateRevertReceipt,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: revertReceipt,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha revertido correctamente el recibo.",
      });
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message || "No se ha podido revertir correctamente el recibo.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateRevertReceipt, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useUpdatePaymentMethod = (onSuccessCallback) => {
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
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado el metodo de pago correctamente.",
      });
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset();
    },
  });
  return { mutateUpdatePaymentMethod, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useEditPaymentHistoryExtension = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateEditHistoryPaymentExtension,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentExtension,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado la prorroga de pago correctamente.",
      });
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset();
    },
  });
  return {
    mutateEditHistoryPaymentExtension,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useEditPaymentHistoryAmount = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateEditHistoryPaymentAmount,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentAmount,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado la cantidad de pago correctamente.",
      });
      await queryClient.invalidateQueries({
        queryKey: ["allReceipts", "allHistoryPayments"],
      }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: () => {
      reset();
    },
  });
  return {
    mutateEditHistoryPaymentAmount,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};
