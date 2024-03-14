import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
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
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
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
        action="https://run.mocky.io/v3/b4f1dde6-a2ea-4a72-bd38-be5b8898ec31"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
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
