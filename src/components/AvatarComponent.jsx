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
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
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
