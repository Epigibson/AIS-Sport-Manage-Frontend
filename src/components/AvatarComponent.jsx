import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";
  if (!isJpgOrPng) {
    message?.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message?.error("Image must smaller than 6MB!");
  }
  return isJpgOrPng && isLt2M;
};
export const AvatarComponent = ({ onImageLoaded, existingImageUrl }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingImageUrl);

  // URL de la imagen predeterminada
  const defaultImageUrl =
    "https://res.cloudinary.com/dxetn6kzs/image/upload/v1712009550/ktwdgg96az6xnhlwag4g.jpg";

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done" || info.file.status === "removed") {
      // Get this url from response in real world.
      const file = info.file.originFileObj;

      getBase64(file, (url) => {
        onImageLoaded(info.file.originFileObj);
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // Este efecto se ejecuta cuando el componente recibe una nueva existingImageUrl
  useEffect(() => {
    setImageUrl(existingImageUrl);
  }, [existingImageUrl]);

  const uploadButton = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        borderRadius: "50%",
        backgroundImage: `url(${defaultImageUrl})`,
        backgroundSize: "cover",
        position: "relative", // Necesario para posicionar el overlay correctamente
      }}
    >
      <div
        style={{
          position: "absolute", // Hace que el overlay cubra el div padre
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          borderRadius: "50%", // Asegura que el overlay tenga bordes redondeados
          background: "rgba(0, 0, 0, 0.5)", // Overlay semitransparente negro, ajusta la transparencia según necesites
        }}
      ></div>
      <div
        style={{
          zIndex: 1, // Asegura que el texto esté sobre el overlay
          color: "white", // Cambia el color del texto si es necesario para mejorar la legibilidad
          marginTop: 8,
        }}
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div>Upload</div>
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        // action=""
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={({ file, onSuccess }) => {
          console.info(file);
          // Simula inmediatamente un éxito. Esto previene la carga automática.
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
      >
        {imageUrl ? (
          <Image
            height={100}
            className={"rounded-full"}
            src={imageUrl}
            alt="avatar"
            preview={false}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

AvatarComponent.propTypes = {
  onImageLoaded: PropTypes.func,
  existingImageUrl: PropTypes.string,
};
