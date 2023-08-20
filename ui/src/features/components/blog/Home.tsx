import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { getBlogs } from "../../actions/blogService";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Blog } from "../../types";

const Home = () => {
  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const isLoading = false;
  const error = "";
  const titles = ["Blogs", "My Blogs"];

  //   const getAllBlogs = async () => {
  //     const allBlogs = await getBlogs();
  //     setBlogs(allBlogs);
  //     console.log("we have", allBlogs);
  //   };
  //   useEffect(() => {
  //     getAllBlogs();
  //   }, []);

  if (blogsQuery.isLoading) {
    return <h1>Fetching blogs...</h1>;
  }

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogsQuery.data && (
        <BlogList blogs={blogsQuery.data} title={titles[0]} />
      )}
    </div>
  );
};

export default Home;
