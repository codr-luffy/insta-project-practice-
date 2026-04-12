import { RouterProvider } from "react-router";
import AppRoutes from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import "./style.scss";
import { PostContextProvider } from "./features/posts/post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
