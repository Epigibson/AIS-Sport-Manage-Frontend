import { getUserSession } from "../api/UserService.jsx";

export const GetUserLoggedIn = async () => {
  try {
    const data = await getUserSession();
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error al obtener la sesion del usaurio: ", error);
    throw error;
  }
};
