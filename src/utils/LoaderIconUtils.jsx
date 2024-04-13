import { Spin } from "antd";

export const LoaderIconUtils = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center">
        <Spin tip={<span className="ml-[-30px]">Cargando</span>} size="large">
          <div className="content" />
        </Spin>
      </div>
    </div>
  );
};
