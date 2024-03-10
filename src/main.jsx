import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "./hooks/CategoryContext/CategoriesProvider.jsx";
import { AuthProvider } from "./hooks/AuthContext/AuthProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </Router>,
);
