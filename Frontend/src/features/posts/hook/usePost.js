import {
  getFeed,
  createPost,
  likePost,
  unlikePost,
} from "../services/post.api.js";
import { useContext, useEffect } from "react";
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

  const handleCreatePost = async (imageFile, caption) => {
    setloading(true);

    const data = await createPost(imageFile, caption);
    console.log(data.post);

    setFeed([data.post, ...feed]);
    setloading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  const handleLike = async (post) => {
    setloading(true);

    const data = await likePost(post);
    await handleGetFeed();
    console.log(data);

    setloading(false);
  };

  const handleUnLike = async (post) => {
    setloading(true);

    const data = await unlikePost(post);
    await handleGetFeed();
    console.log(data);

    setloading(false);
  };

  return {
    loading,
    posts,
    feed,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
  };
};
