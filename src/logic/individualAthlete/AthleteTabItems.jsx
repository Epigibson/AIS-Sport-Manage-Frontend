import { GroupAssignLogic } from "../groupAassign/GroupAssignLogic.jsx";
import { MembershipAssignLogic } from "../membershipAssign/MembershipAssignLogic.jsx";

export const AthleteTabItems = (currentAthlete) => [
  {
    key: "1",
    label: "Membresias",
    component: MembershipAssignLogic,
    props: currentAthlete,
  },
  {
    key: "2",
    label: "Asignacion de Grupos",
    component: GroupAssignLogic,
    props: currentAthlete,
  },
];
