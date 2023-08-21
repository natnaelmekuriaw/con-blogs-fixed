import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import BlogList from "./BlogList";
import { getBlogs } from "../../actions/blogService";

import { Blog } from "../../types";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const isLoading = false;
  const error = "";
  const titles = ["Blogs", "My Blogs"];

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });

  if (blogsQuery.isLoading) {
    return (
      <div className="home">
        <h2>Loading</h2>
      </div>
    );
  }
  if (blogsQuery.isError) {
    return (
      <div className="home">
        <h2>Error fetching blogs</h2>
        <h2>{JSON.stringify(blogsQuery.error)}</h2>
      </div>
    );
  }
  return (
    <div className="home">
      {blogsQuery.data && (
        <BlogList blogs={blogsQuery.data} title={titles[0]} />
      )}
    </div>
  );
};

export default Home;
