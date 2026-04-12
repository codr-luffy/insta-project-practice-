import { createContext } from "react";
import { useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [feed, setFeed] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, setloading, posts, setPosts, feed, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};
