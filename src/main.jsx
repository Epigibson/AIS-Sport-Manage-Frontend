import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "./hooks/CategoriesContext.jsx";
import { CouchesProvider } from "./hooks/CouchesContext.jsx";
import { GroupsProvider } from "./hooks/GroupContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GroupsProvider>
          <CouchesProvider>
            <CategoriesProvider>
              <App />
            </CategoriesProvider>
          </CouchesProvider>
        </GroupsProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </Router>,
);
