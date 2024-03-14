import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getResume } from "../../api/ResumeService.jsx";

export const ResumePayments = () => {
  const { data: resume } = useQuery({
    queryKey: ["getResume"],
    queryFn: getResume,
  });

  return (
    <TablesComponent
      data={resume}
      title="Deudores"
      type="debtors"
      columns={["Nombre", "Apellido", "Correo electrónico"]}
      tableColumns={["name", "lastname", "email"]}
      tableTitle="Deudores"
      tableSubtitle="Lista de deudores"
      tableDescription="Esta tabla muestra una lista de deudores registrados en el sistema."
      tableFooter="Esta tabla muestra una lista de deudores registrados en el sistema."
      tableFooterLink="/debtors"
      tableFooterLinkText="Ver todos los deudores"
      tableFooterLinkIcon="arrow-right"
      tableFooterLinkIconColor="primary"
      tableFooterLinkIconSize="sm"
      tableFooterLinkIconPosition="right"
      tableFooterLinkIconRounded="rounded-full"
      tableFooterLinkIconRoundedSize="md"
      tableFooterLinkIconRoundedPosition="right"
      tableFooterLinkIconRoundedRounded="rounded-full"
    />
  );
};
