import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeAvatar,
  createUser,
  deleteUser,
  updateUser,
} from "../../api/UserService.jsx";

export const useCreateUser = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      console.log("Mutación exitosa");
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
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

export const useUpdateUser = () => {
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
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
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

export const useDeleteUser = () => {
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
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
  });
  return { mutateDelete, isSuccess, isError, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useChangeAvatar = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutateAsync: mutateUpdateAvatar,
    isSuccess,
    isError,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: async (data) => {
      console.log("Mutación exitosa", data);
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
      window.location.href = data?.init_point;
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateUpdateAvatar, isSuccess, isError, isPending, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};

export const useChangeAvatarWithoutRegister = () => {
  const queryClient = useQueryClient(); // Obtener el cliente de react-query
  const {
    mutateAsync: mutateUpdateAvatar,
    isSuccess,
    isError,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: async (data) => {
      console.log("Mutación exitosa", data);
      await queryClient.invalidateQueries({ queryKey: ["allUsers"] }); // Invalidar la consulta "allPackages"
    },
    onError: (error) => {
      console.error("Error en la mutación", error);
    },
    onSettled: () => {
      reset(); // Resetear el estado de la mutación después de ejecutarla y dejarla en su estado inicial. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Esto es útil cuando se ejecuta una mutación que requiere de confirmación de usuario. El estado de la mutación se mantendrá en "pending" mientras el usuario confirma la acción. Después de confirmar la acción, el estado de la mutación pasará a "settled" y se puede utilizar el método "reset" para resetear el estado de la mutación. Est
    },
  });
  return { mutateUpdateAvatar, isSuccess, isError, isPending, error, reset }; // Asegúrate de devolver estos valores desde tu hook
};
