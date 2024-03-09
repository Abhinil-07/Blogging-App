import { useState } from "react";
import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/BlogCard";
import { BlogSkeleton } from "../Components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, blogs } = useBlogs(currentPage);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (loading) {
    return (
      <>
        <Appbar />
        <div className="flex justify-center items-center flex-col mt-4 ">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mt-4">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
      <div className="px-2">
        <button onClick={() => handlePageClick(1)}>1</button>
        <button onClick={() => handlePageClick(2)}>2</button>
      </div>
    </div>
  );
};

export default Blogs;
