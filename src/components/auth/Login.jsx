import { useAuth } from "../../hooks/AuthContext/useAuth.jsx";
import { useEffect } from "react";
import logo from "/src/assets/logo-be.png";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/tokenUtils.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserSession } from "../../api/UserService.jsx";

export const Login = () => {
  const { loginHandler, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: loggedUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getUserSession,
    enabled: !!getToken(), // Solo ejecuta la consulta si hay un token presente
  });

  const navigate = useNavigate();
  const onFinish = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado de envío del formulario
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    await loginHandler(username, password);
    await queryClient.invalidateQueries(["loggedUser"]); // Invalidar la consulta para obtener los datos actualizados del usuario
  };

  useEffect(() => {
    const token = getToken();
    if (token !== null && loggedUser && !isUserLoading) {
      console.log("Usuario autenticado:", loggedUser);
      const userRole = loggedUser.user_type;
      if (userRole === "Normal" || userRole === "User") {
        navigate("/perfil");
      } else if (
        (userRole !== undefined && userRole === "Admin") ||
        userRole === "Manager"
      ) {
        navigate("/home");
      }
    }
  }, [isUserLoading, loggedUser, navigate]);

  return (
    <section className="bg-[#001529] dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-28 h-28 mr-2" src={logo} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Iniciar Sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onFinish}>
              <div>
                <label
                  form="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo Electrónico
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  disabled={isLoading}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@mail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  form="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <Input.Password
                  name="password"
                  id="password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="px-2 py-2"
                />
              </div>
              {/*<div className="flex items-center justify-between">*/}
              {/*<div className="flex items-start">*/}
              {/*<div className="flex items-center h-5">*/}
              {/*  <input*/}
              {/*    id="remember"*/}
              {/*    aria-describedby="remember"*/}
              {/*    type="checkbox"*/}
              {/*    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
              {/*    required=""*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<div className="ml-3 text-sm">*/}
              {/*  <label*/}
              {/*    form="remember"*/}
              {/*    className="text-gray-500 dark:text-gray-300"*/}
              {/*  >*/}
              {/*    Remember me*/}
              {/*  </label>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<a*/}
              {/*  href="#"*/}
              {/*  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"*/}
              {/*>*/}
              {/*  Olvide mi contraseña?*/}
              {/*</a>*/}
              {/*</div>*/}
              <Button
                type="primary"
                loading={isLoading}
                disabled={isLoading}
                htmlType="submit"
                className="w-full text-white bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ingresar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
