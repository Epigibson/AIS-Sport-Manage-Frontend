import { Button, Checkbox, Form, Input, Select } from "antd";

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
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export const InscriptionLayout = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      size={"small"}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
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
              return Promise.reject(new Error("Las contraseñas no coinciden!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

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

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Por favor ingresa un numero telefonico!",
          },
        ]}
      >
        <Input className="p-0 m-0 rounded-md border-gray-300" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
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

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Debes de aceptar los terminos")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          className="bg-blue-500 w-full"
          size={"large"}
          htmlType="submit"
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
