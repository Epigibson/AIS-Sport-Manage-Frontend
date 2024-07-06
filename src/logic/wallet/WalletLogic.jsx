import { Row } from "antd";
import { CardUserComponent } from "../../components/CardUserComponent.jsx";
import { WalletsCardConfigs } from "./WalletsCardConfigs.jsx";
import { useEffect, useState } from "react";

export const WalletLogic = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(WalletsCardConfigs);
  }, []);

  return (
    <Row gutter={24} className={"mt-3"}>
      {cards.map((config, index) => (
        <CardUserComponent
          key={index}
          title={config.title}
          colorHeader={config.colorHeader}
          colorBody={config.colorBody}
          colorFooter={config.colorFooter}
          borderColor={config.borderColor}
          viewButton={config.viewButton}
          addButton={config.addButton}
          editButton={config.editButton}
          deleteButton={config.deleteButton}
          isEditMode={config.isEditMode}
          isAddMode={config.isAddMode}
          customEdit={config.customEdit}
        />
      ))}
    </Row>
  );
};
