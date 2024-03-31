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

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/inscripciones" element={<InscriptionPage />} />
          <Route path="/pagos" element={<PaymentsPage />} />
          <Route path="/atletas" element={<AthletesPage />} />
          <Route path="/coaches" element={<CouchesPage />} />
          <Route path="/grupos" element={<GroupsPage />} />
          <Route
            path="/asignacion_de_grupos/:athleteId"
            element={<GroupAssignPage />}
          />
          <Route path="/paquetes" element={<PackagesPage />} />
          <Route path="/adeudos" element={<DebtorsPage />} />
          <Route path="/analiticas" element={<AnalyticsPage />} />
          <Route path="/pago/fallo" element={<PaymentFailedPage />} />
          <Route path="/pago/pendiente" element={<PaymentPendingPage />} />
          <Route path="/pago/exito" element={<PaymentSuccessPage />} />
          <Route
            path="/asignacion_de_grupos/:userId"
            element={<GroupAssignPage />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
