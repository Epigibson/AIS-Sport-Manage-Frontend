import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { UsersPage } from "./pages/UsersPage.jsx";
import { InscriptionPage } from "./pages/InscriptionPage.jsx";
import { CouchesPage } from "./pages/CouchesPage.jsx";
import { GroupsPage } from "./pages/GroupsPage.jsx";
import { PackagesPage } from "./pages/PackagesPage.jsx";
import { DebtorsPage } from "./pages/DebtorsPage.jsx";
import { AnalyticsPage } from "./pages/AnalyticsPage.jsx";
import { PaymentFailedPage } from "./pages/PaymentPages/PaymentFailedPage.jsx";
import { PaymentPendingPage } from "./pages/PaymentPages/PaymentPendingPage.jsx";
import { PaymentSuccessPage } from "./pages/PaymentPages/PaymentSuccessPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/inscriptions" element={<InscriptionPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/couches" element={<CouchesPage />} />
      <Route path="/grupos" element={<GroupsPage />} />
      <Route path="/paquetes" element={<PackagesPage />} />
      <Route path="/adeudos" element={<DebtorsPage />} />
      <Route path="/analiticas" element={<AnalyticsPage />} />
      <Route path="/pago/fallo" element={<PaymentFailedPage />} />
      <Route path="/pago/pendiente" element={<PaymentPendingPage />} />
      <Route path="/pago/exito" element={<PaymentSuccessPage />} />
    </Routes>
  );
};

export default App;
