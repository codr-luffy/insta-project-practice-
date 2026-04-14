import { useState, useRef } from "react";
import "../style/createPost.scss";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputRef = useRef(null);
  const navigate = useNavigate();
  const { handleCreatePost, loading } = usePost();

  function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputRef.current.files[0];

    handleCreatePost(file, caption);
    navigate("/");
  }

  if (loading) {
    return <main>Creating Post...</main>;
  }

  return (
    <main className="create-post-p">
      <div className="form-container">
        <h1>Create Post</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label className="post-image-lable" htmlFor="postImage">
            Upload Image
          </label>
          <input
            hidden
            ref={postImageInputRef}
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            name="Caption"
            id="Caption"
            placeholder="Caption"
          />
          <button className="btn btn-primary">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
