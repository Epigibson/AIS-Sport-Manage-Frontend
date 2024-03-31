import { Card, Form } from "antd";
import { useInscription } from "./InscriptionLogicMutations.jsx";
import { FormComponent } from "../../components/FormComponent.jsx";
import { InscriptionFormFields } from "./InscriptionFormFields.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { useState } from "react";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { UserAvatarFormFields } from "./UserAvatarFormFields.jsx";
import { useChangeAvatar } from "../athletes/AthleteLogicMutations.jsx";

export const InscriptionLayout = () => {
  const [form] = Form.useForm();
  const [formAvatar] = Form.useForm();
  const [profileImage, setProfileImage] = useState();
  const [registeredUser, setRegisteredUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  let {
    mutateCreate,
    isError: isErrorCreate,
    error: errorCreate,
    isPending: isPendingCreate,
  } = useInscription();
  const { mutateUpdateAvatar } = useChangeAvatar();

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setProfileImage(null);
    form.resetFields();
  };

  const handleChanceAvatar = async () => {
    try {
      const image = await formAvatar.validateFields();
      console.log(profileImage);
      console.log(image);
      const data = {};
      const formData = new FormData();
      formData.append("file", profileImage);
      data.username = registeredUser?.username;
      data.file = formData;
      await mutateUpdateAvatar(data);
      closeModal();
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setRegisteredUser(values);
      const data = {};
      data.new_user = values;
      data.products = values.products;
      delete data.new_user.products;
      await mutateCreate(data, openModal);
      form.resetFields();
      // if (values) {
      //   openModal();
      // }
    } catch (error) {
      console.error("Error al validar los campos del formulario:", error);
    }
  };

  if (isPendingCreate) return <LoaderIconUtils />;
  if (isErrorCreate) return <div>Error: {errorCreate?.message} </div>;

  return (
    <Card>
      <ModalComponent
        title={`Agregar avatar para ${registeredUser?.name}`}
        onOpen={modalVisible}
        onClose={closeModal}
        form={formAvatar}
        formFields={UserAvatarFormFields}
        onOk={handleChanceAvatar}
        setProfileImage={setProfileImage}
      />
      <FormComponent
        form={form}
        formFields={InscriptionFormFields}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};
