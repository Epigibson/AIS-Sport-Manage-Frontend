import { Divider, Form } from "antd";
import { useAuth } from "../../hooks/AuthContext/useAuth.jsx";
import { FormComponent } from "../FormComponent.jsx";
import { LoginFormFields } from "./LoginFormFields.jsx";
import "./Login.css"; // Asumiendo que tienes un archivo CSS para estilos adicionales
import logoImage from "../../assets/logo-be.png";

export const LoginOld = () => {
  const { loginHandler } = useAuth();
  const isLogin = true;
  const logo = logoImage;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await loginHandler(values.username, values.password);
  };

  return (
    <>
      <section className="h-screen bg-slate-900">
        <div className="container h-full p-0 m-auto sm:p-0">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-200 dark:text-neutral-200">
            <div
              className="w-[calc(100%-2rem)] max-w-2xl"
              style={{ maxHeight: "calc(100vh-1rem)" }}
            >
              <div className="block shadow-lg dark:bg-neutral-800 g-0 lg:flex divide-x lg:flex-wrap">
                <div className="bg-slate-700 sm:rounded-t md:rounded-l px-4 md:px-0 lg:flex-auto lg:w-6/12">
                  <div className="md:mx-6 md:px-12 md:py-8 text-slate-300">
                    <div className="w-full text-center gap-3 sm:my-1 my-5  inline-flex justify-center content-center items-center sm:block">
                      <img
                        className="w-100 sm:mx-auto mx-2  sm:w-1/4"
                        src={logo}
                        alt="logo"
                      />
                    </div>

                    <Divider
                      className={"text-blue-100"}
                      style={{ color: "#d2d2d2" }}
                    >
                      Ingresa a tu cuenta
                    </Divider>
                    <FormComponent
                      form={form}
                      formFields={LoginFormFields}
                      handleSubmit={onFinish}
                      isLogin={isLogin}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
