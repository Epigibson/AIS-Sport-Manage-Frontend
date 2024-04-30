import { Card, Image } from "antd";
import { TabsComponent } from "../../components/TabsComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAthleteByUuid } from "../../api/AtheleService.jsx";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import error from "eslint-plugin-react/lib/util/error.js";
import { AthleteTabItems } from "./AthleteTabItems.jsx";

export const IndividualAthleteLogic = () => {
  const { athleteId } = useParams();
  const {
    data: currentAthlete,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentAthlete", athleteId],
    queryFn: () => getAthleteByUuid(athleteId),
    enabled: !!athleteId,
  });

  const location = useLocation();
  let queryParams;
  queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(queryParams.get("tab") || "1");

  const defaultImageUrl =
    "https://res.cloudinary.com/dxetn6kzs/image/upload/v1712009550/ktwdgg96az6xnhlwag4g.jpg";
  const avatar = currentAthlete?.avatar
    ? currentAthlete?.avatar
    : defaultImageUrl;

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Card loading={isLoading}>
      <Image
        className={"rounded-full"}
        src={avatar}
        width={100}
        height={100}
      ></Image>
      <h1 className={"text-center text-lg font-bold mb-4"}>
        {currentAthlete?.name}
      </h1>
      <TabsComponent
        items={AthleteTabItems(currentAthlete)}
        activeKey={activeTab}
        setActiveKey={setActiveTab}
      />
    </Card>
  );
};
