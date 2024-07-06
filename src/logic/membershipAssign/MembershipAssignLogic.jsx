import { useParams } from "react-router-dom";
import { Button, Card, Form, Row } from "antd";
import { useState } from "react";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAthleteByUuid } from "../../api/AtheleService.jsx";
import error from "eslint-plugin-react/lib/util/error.js";
import { MembershipsFromAthletesColumns } from "./MembershipsFromAthletesColumns.jsx";
import { getAllPackages } from "../../api/ProductService.jsx";
import { AthleteMembershipAssignFields } from "./AthleteMembershipAssignFields.jsx";
import {
  useAssignMembershipToAthleteMutation,
  useRemoveMembershipToAthleteMutation,
} from "./MembershipAssignMutations.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const MembershipAssignLogic = () => {
  const { athleteId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: currentAthlete,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentAthlete", athleteId],
    queryFn: () => getAthleteByUuid(athleteId),
    enabled: !!athleteId,
  });

  const { data: packagesData } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  const enrichedPackageData = packagesData
    ?.filter((membership) =>
      currentAthlete?.products_which_inscribed.includes(membership._id),
    )
    .map((membership) => {
      return {
        ...membership,
      };
    });

  const handleInvalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: ["currentAthlete"] }); // Invalidar la consulta "allPackages"
    form.resetFields();
    setIsModalVisible(false);
    await refetch();
  };

  const { mutateAssignMembershipToAthlete, isPending } =
    useAssignMembershipToAthleteMutation(handleInvalidateQueries);
  const { mutateRemoveMembershipToAthlete } =
    useRemoveMembershipToAthleteMutation(handleInvalidateQueries);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    values.athlete_id = currentAthlete.athlete_id;
    await mutateAssignMembershipToAthlete(values);
  };

  const handleDelete = async (record) => {
    const values = {
      membership_id: record._id,
      athlete_id: currentAthlete.athlete_id,
    };
    await mutateRemoveMembershipToAthlete(values);
  };

  const columns = MembershipsFromAthletesColumns({
    onDelete: handleDelete,
    onCancel: handleCancel,
  });

  if (isLoading) return <LoaderIconUtils isLoading={true} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Card loading={isLoading}>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          // onClick={showModal}
          onClick={handleShowModal}
        >
          Asignar una Membresia
        </Button>
      </Row>
      <ModalComponent
        title={"Asignar Membresia"}
        form={form}
        formFields={AthleteMembershipAssignFields}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
        confirmLoading={isPending} // confirmLoading toma el valor de isPending
      />
      <TablesComponent data={enrichedPackageData} columns={columns} />
    </Card>
  );
};
