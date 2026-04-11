import { RouterProvider } from "react-router";
import AppRoutes from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import "./style.scss";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
