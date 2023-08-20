import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { getBlogs } from "../../actions/blogService";

import { Blog } from "../../types";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const isLoading = false;
  const error = "";
  const titles = ["Blogs", "My Blogs"];

  const getAllBlogs = async () => {
    const allBlogs = await getBlogs();
    setBlogs(allBlogs);
    console.log("we have", allBlogs);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title={titles[0]} />}
    </div>
  );
};

export default Home;
