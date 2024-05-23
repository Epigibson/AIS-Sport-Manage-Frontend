import { getUserSession } from "../api/UserService.jsx";

export const GetUserLoggedIn = async () => {
  try {
    const data = await getUserSession();
    localStorage.setItem("userData", data);
    return data;
  } catch (error) {
    console.error("Error al obtener la sesion del usaurio: ", error);
    throw error;
  }
};
