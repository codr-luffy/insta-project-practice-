import "./Nav.scss";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <p>Insta</p>
      <button
        onClick={() => navigate("/CreatePost")}
        className="btn btn-primary"
      >
        New Post
      </button>
    </nav>
  );
};

export default Navbar;
