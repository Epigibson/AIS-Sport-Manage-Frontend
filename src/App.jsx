import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AthletesPage } from "./pages/AthletesPage.jsx";
import { InscriptionPage } from "./pages/InscriptionPage.jsx";
import { CouchesPage } from "./pages/CouchesPage.jsx";
import { GroupsPage } from "./pages/GroupsPage.jsx";
import { PackagesPage } from "./pages/PackagesPage.jsx";
import { DebtorsPage } from "./pages/DebtorsPage.jsx";
import { AnalyticsPage } from "./pages/AnalyticsPage.jsx";
import { PaymentFailedPage } from "./pages/PaymentPages/PaymentFailedPage.jsx";
import { PaymentPendingPage } from "./pages/PaymentPages/PaymentPendingPage.jsx";
import { PaymentSuccessPage } from "./pages/PaymentPages/PaymentSuccessPage.jsx";
import { PaymentsPage } from "./pages/PaymentsPage.jsx";
import { ProtectedRoute } from "./utils/ProtectedRoute.jsx";
import { AuthProvider } from "./hooks/AuthContext/AuthProvider.jsx";
import { GroupAssignPage } from "./pages/GroupAssignPage.jsx";
import { IndividualAthletePage } from "./pages/IndividualAthletePage.jsx";
import { DiscountsPage } from "./pages/DiscountsPage.jsx";
import { ConfigurationPage } from "./pages/ConfigurationPage.jsx";
import { MovementsPage } from "./pages/MovementsPage.jsx";
import { ReportsPage } from "./pages/ReportsPage.jsx";
import { UserProfilePage } from "./pages/UserPages/UserProfilePage.jsx";
import { UserAthletesPage } from "./pages/UserPages/UserAthletesPage.jsx";
import { UserPaymentsPage } from "./pages/UserPages/UserPaymentsPage.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { SalesHistoryPage } from "./pages/SalesHistoryPage.jsx";
import { UserListPage } from "./pages/UserListPage.jsx";
import { HistoryBalancePage } from "./pages/HistoryBalancePage.jsx";
import { AttendancePage } from "./pages/AttendancePage.jsx";
import { WalletPage } from "./pages/WalletPage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/inscripciones" element={<InscriptionPage />} />
          <Route path="/pagos" element={<PaymentsPage />} />
          <Route path="/historial_de_saldos" element={<HistoryBalancePage />} />
          <Route path="/atletas" element={<AthletesPage />} />
          <Route path="/usuarios" element={<UserListPage />} />
          <Route path="/coaches" element={<CouchesPage />} />
          <Route path="/pase_de_lista" element={<AttendancePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/ventas_indirectas" element={<SalesHistoryPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/grupos" element={<GroupsPage />} />
          <Route
            path="/asignacion_de_grupos/:athleteId"
            element={<GroupAssignPage />}
          />
          <Route
            path="/atleta/:athleteId"
            element={<IndividualAthletePage />}
          />
          <Route path="/paquetes" element={<PackagesPage />} />
          <Route path="/descuentos" element={<DiscountsPage />} />
          <Route path="/adeudos" element={<DebtorsPage />} />
          <Route path="/configuracion" element={<ConfigurationPage />} />
          <Route path="/movimientos" element={<MovementsPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
          <Route path="/analiticas" element={<AnalyticsPage />} />
          <Route path="/pago/fallo" element={<PaymentFailedPage />} />
          <Route path="/pago/pendiente" element={<PaymentPendingPage />} />
          <Route path="/pago/exito" element={<PaymentSuccessPage />} />
          <Route
            path="/asignacion_de_grupos/:userId"
            element={<GroupAssignPage />}
          />
          <Route path="/perfil" element={<UserProfilePage />} />
          <Route path="/mis_atletas" element={<UserAthletesPage />} />
          <Route path="/mis_pagos" element={<UserPaymentsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
