import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loginHandler } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    loginHandler(values.username, values.password);
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center w-full lg:p-2">
      <div className="flex items-center xl:p-12">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
        >
          <h3 className="mt-3 mb-3 text-4xl font-extrabold text-dark-grey-900">
            Entrar
          </h3>
          <p className="mb-4 text-grey-700">
            Ingresa con tu correo y contraseña
          </p>
          <a className="flex items-center justify-center w-full py-4 mb-2 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
            <img
              className="h-5 mr-2"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
              alt=""
            />
            Entrar con Google
          </a>
          <div className="flex items-center mb-3">
            <hr className="h-0 border-b border-solid border-grey-500 grow" />
            <p className="mx-4 text-grey-600">or</p>
            <hr className="h-0 border-b border-solid border-grey-500 grow" />
          </div>
          <Form.Item
            label="Usuario o Correo"
            name="username"
            rules={[
              {
                required: true,
                message: "Porfavor ingresa tu correo electrocnico.",
              },
            ]}
          >
            <Input
              placeholder="example@mail.com"
              className="flex items-center w-full px-5 py-4 mr-0 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Porfavor ingresa tu contraseña." },
            ]}
          >
            <Input.Password
              placeholder="*******************"
              className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
          </Form.Item>
          <Form.Item
            name="keep_session"
            rules={[{ required: false, message: "" }]}
          >
            <div className="flex justify-between w-full">
              <Checkbox defaultChecked={true}>Mantenerme en sesion</Checkbox>
              <Button size={"small"} className="text-sm border-0">
                Olvide mi contraseña
              </Button>
            </div>
          </Form.Item>
          <Button
            size={"large"}
            type={"primary"}
            color={"purple-blue"}
            className="md:w-96 rounded-2xl bg-blue-900 mb-4"
            htmlType={"submit"}
          >
            Iniciar Sesion
          </Button>
          <Button
            className="text-sm leading-relaxed text-grey-900 border-0"
            type={"dashed"}
            size={"small"}
          >
            Aun no estas registrado?
            <span className="font-bold">Crea tu Cuenta</span>
          </Button>
        </Form>
      </div>
    </div>
  );
};
