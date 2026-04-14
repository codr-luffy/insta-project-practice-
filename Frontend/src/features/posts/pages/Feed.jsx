import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post.jsx";
import { usePost } from "../hook/usePost";
import Navbar from "../../shared/components/Navbar.jsx";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnLike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is Loading</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                user={post.user}
                posts={post}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
                loading={loading}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
