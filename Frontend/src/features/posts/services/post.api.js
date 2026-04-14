import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/api/posts/feed");
  console.log(response);
  return response.data;
}

export async function createPost(imageFile, caption) {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("caption", caption);

  const responce = await api.post("/api/posts", formData);
  return responce.data;
}

export async function likePost(postId) {
  const responce = await api.post("/api/posts/like/" + postId);
  return responce.data;
}

export async function unlikePost(postId) {
  const responce = await api.post("/api/posts/unlike/" + postId);
  return responce.data;
}
