import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}
export const useBlogs = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch new data
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors if any
        setLoading(false);
        console.error("Error fetching blogs:", error);
      });
  }, [page]); // Run useEffect whenever the page changes

  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
