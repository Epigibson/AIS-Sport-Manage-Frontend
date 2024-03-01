import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "../../api/ProductService.jsx";
import { useInscription } from "../../logic/inscription/InscriptionLogicMutations.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 8,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};
export const InscriptionLayout = () => {
  const [form] = Form.useForm();
  const { mutateCreate, isPending } = useInscription();
  const {
    data: packagesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: getAllPackages,
  });
  const onFinish = (values) => {
    // Convertir ciertos campos para que coincidan con la estructura requerida
    const transformedData = {
      new_user: {
        email: values.email,
        username: values.email.split("@")[0], // Suponiendo que quieres usar el correo como username, ajusta según necesites
        password: values.password,
        tutors_name: values.tutors_name,
        name: values.name,
        gender: values.gender,
        age: parseInt(values.age, 10), // Convertir la edad a número
        sport_preference: values.sport_preference,
        hobbies: values.hobbies.split(",").map((hobby) => hobby.trim()), // Convertir la cadena de hobbies en un arreglo
        // Asumiendo que otros campos como 'role', 'phone', etc. son manejados en otra parte o no son necesarios
        phone: values.phone,
        // Agrega los campos restantes según sean necesarios
      },
      products: [values.products], // Convertir en arreglo
    };
    console.log("DATA ANTES DE LA MUTACION", transformedData);
    mutateCreate(transformedData);
  };

  if (isLoading || isPending) return <LoaderIconUtils />;
  if (isError) return <div>Error: {error.message} </div>;

  return (
    <>
      <Card>
        <Form
          {...formItemLayout}
          className="mt-10 px-6"
          size={"small"}
          form={form}
          name="register"
          onFinish={onFinish}
          layout="horizontal"
          style={{ maxWidth: "100%" }}
          scrollToFirstError
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "No es un correo valido!",
                  },
                  {
                    required: true,
                    message: "Por favor ingresa el E-mail!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor escribe tu contraseña!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="confirm"
                label="Confirmacion de Contraseña"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor confirma la contraseña!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden!"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre del Atleta"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del Atleta!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="tutors_name"
                label="Nombre del Padre / Madre"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del padre o madre!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Telefono"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa un numero telefonico!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Genero"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona el genero!",
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Masculino</Option>
                  <Option value="female">Femenino</Option>
                  <Option value="other">Otro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Edad"
                rules={[
                  {
                    required: true,
                    message: "Por favor especifica la edad!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="sport_preference"
                label="Deporte de Preferencia"
                rules={[
                  {
                    required: true,
                    message: "Por favor especifica el deporte de preferencia.!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hobbies"
                label="Hobbies"
                rules={[
                  {
                    required: true,
                    message: "Por favor indica los Hobbies!",
                  },
                ]}
              >
                <Input className="p-0 m-0 rounded-md border-gray-300" />
              </Form.Item>
            </Col>
          </Row>
          <Row
            {...tailFormItemLayout}
            className="justify-center my-4"
            gutter={24}
          >
            <Col span={8}>
              <Form.Item
                className="text-center"
                name="products"
                label="Paquete"
                rules={[
                  {
                    required: true,
                    message: "Por favor indica el paquete!",
                  },
                ]}
              >
                <Select>
                  {packagesData?.map((option, index) => (
                    <Option
                      key={option.product_id || index}
                      value={option.value}
                    >
                      {option.product_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" className="mt-10" gutter={24}>
            <Col span={24}>
              <Form.Item
                className="text-center"
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Debes de aceptar los terminos"),
                          ),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  He leido los <a href="">acuerdos y terminos de privacidad.</a>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center my-4" gutter={24}>
            <Col span={24}>
              <Form.Item {...tailFormItemLayout} className="text-center">
                <Button
                  type="primary"
                  className="bg-blue-500 w-full"
                  size={"large"}
                  htmlType="submit"
                >
                  Registrar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};
