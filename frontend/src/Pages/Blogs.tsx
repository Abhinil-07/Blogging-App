import { useState } from "react";
import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/BlogCard";
import { BlogSkeleton } from "../Components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, blogs } = useBlogs(currentPage);
  const buttons = ["1", "2", "3", "4", "5"];
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
      <div className="mt-[60px] mb-[30px]">
        <div className="flex items-center justify-center gap-4">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {buttons.map((label, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(Number(label))}
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className=" text-md absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
