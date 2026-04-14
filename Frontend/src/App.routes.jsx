import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Feed from "./features/posts/pages/Feed.jsx";
import CreatePost from "./features/posts/pages/CreatePost.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
