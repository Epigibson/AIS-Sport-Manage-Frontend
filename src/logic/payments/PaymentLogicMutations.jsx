import { useMutation } from "@tanstack/react-query";
import {
  cancelReceipt,
  payReceipt,
  revertReceipt,
  subtractAmountReceiptWithBalance,
} from "../../api/ReceiptsService.jsx";
import {
  addHistoryPaymentDiscountCode,
  createPayment,
  deleteHistoryPayment,
  editHistoryPaymentAmount,
  editHistoryPaymentExtension,
  editHistoryPaymentLimitDate,
  editHistoryPaymentPeriodMonth,
  updatePaymentMethod,
} from "../../api/PaymentService.jsx";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const useCreatePayment = (onSuccessCallback, clearFields) => {
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createPayment,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha creado correctamente el nuevo pago.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message || "No se ha podido crear correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return { mutateCreate, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const usePayReceipt = (onSuccessCallback, clearFields) => {
  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    error,
    reset,
    isPending: mutateUpdatePending,
  } = useMutation({
    mutationFn: payReceipt,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha confirmado correctamente el pago.",
      });
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
    onSettled: async () => {
      await clearFields();
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return {
    mutateUpdate,
    mutateUpdatePending,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useSubtractAmountReceiptWithBalance = (
  onSuccessCallback,
  clearFields,
) => {
  const {
    mutate: mutateSubtractAmountReceiptWithBalance,
    isSuccess,
    isError,
    error,
    isPending: mutateSubtractAmountReceiptWithBalancePending,
    reset,
  } = useMutation({
    mutationFn: subtractAmountReceiptWithBalance,
    onSuccess: async () => {
      await onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description:
          "Se ha aplicado correctamente el saldo indicado al precio del recibo.",
      });
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
      const errorMessage =
        error.message ||
        "No se ha podido aplicar el saldo a favor en el recibo.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto
    },
  });
  return {
    mutateSubtractAmountReceiptWithBalance,
    isSuccess,
    isError,
    error,
    reset,
    mutateSubtractAmountReceiptWithBalancePending,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useCancelReceipt = (onSuccessCallback) => {
  const {
    mutate: mutateUpdateCancelReceipt,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: cancelReceipt,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha cancelado correctamente el recibo.",
      });
    },
    onError: (error) => {
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

export const useRevertReceipt = (onSuccessCallback) => {
  const {
    mutate: mutateRevertReceipt,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: revertReceipt,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha revertido correctamente el recibo.",
      });
    },
    onError: (error) => {
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

export const useUpdatePaymentMethod = (onSuccessCallback, clearFields) => {
  const {
    mutate: mutateUpdatePaymentMethod,
    isSuccess,
    isError,
    error,
    reset,
    isPending: updatePaymentMethodPending,
  } = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado el metodo de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
      reset();
    },
  });
  return {
    mutateUpdatePaymentMethod,
    isSuccess,
    isError,
    error,
    reset,
    updatePaymentMethodPending,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useEditPaymentHistoryExtension = (
  onSuccessCallback,
  clearFields,
) => {
  const {
    mutate: mutateEditHistoryPaymentExtension,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentExtension,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado la prorroga de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
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

export const useEditPaymentHistoryAmount = (onSuccessCallback, clearFields) => {
  const {
    mutate: mutateEditHistoryPaymentAmount,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentAmount,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado la cantidad de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
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

export const useEditPaymentHistoryLimitDate = (
  onSuccessCallback,
  clearFields,
) => {
  const {
    mutate: mutateEditHistoryPaymentLimitDate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentLimitDate,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha actualizado la fecha limite de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields;
      reset();
    },
  });
  return {
    mutateEditHistoryPaymentLimitDate,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useEditPaymentHistoryPeriodMonth = (
  onSuccessCallback,
  clearFields,
) => {
  const {
    mutate: mutateEditHistoryPaymentPeriodMonth,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: editHistoryPaymentPeriodMonth,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description:
          "Se ha actualizado el mes correspondiente de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
      reset();
    },
  });
  return {
    mutateEditHistoryPaymentPeriodMonth,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useAddPaymentHistoryDiscountCode = (
  onSuccessCallback,
  clearFields,
) => {
  const {
    mutate: mutateAddHistoryPaymentDiscountCode,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: addHistoryPaymentDiscountCode,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description:
          "Se ha agregado el cupon de descuento al pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message ||
        "No se ha podido actualizar correctamente el registro.";
      toastNotify({
        type: "error",
        message: "Accion no realizada!.",
        description: errorMessage,
      });
    },
    onSettled: async () => {
      await clearFields();
      reset();
    },
  });
  return {
    mutateAddHistoryPaymentDiscountCode,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};

export const useDeletePaymentHistory = (onSuccessCallback) => {
  const {
    mutate: mutateDeleteHistoryPayment,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteHistoryPayment,
    onSuccess: async () => {
      onSuccessCallback();
      toastNotify({
        type: "success",
        message: "Exito!.",
        description: "Se ha eliminado el recibo de pago correctamente.",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "No se ha podido actualizar correctamente la accion.";
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
    mutateDeleteHistoryPayment,
    isSuccess,
    isError,
    error,
    reset,
  }; // Asegúrate de devolver estos valores desde tu hook
};
