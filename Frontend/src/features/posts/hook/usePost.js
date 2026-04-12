import { getFeed } from "../services/post.api.js";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, posts, feed, setloading, setPosts, setFeed } = context;

  const handleGetFeed = async () => {
    setloading(true);
    const data = await getFeed();
    console.log(data);
    setFeed(data.post);
    setloading(false);
  };
  return {
    loading,
    posts,
    feed,
    handleGetFeed,
  };
};
