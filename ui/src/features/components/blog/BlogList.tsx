import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../types";
dayjs.extend(relativeTime);

interface Blogs {
  blogs: Blog[] | [];
  title: string;
}
const BlogList: React.FC<Blogs> = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      <h2>
        {title} ({blogs.length})
      </h2>
      {blogs?.length > 0 && (
        <>
          {blogs.map((blog) => (
            <div className="blog-preview" key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      //   backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={blog.image}
                      alt="blog_image"
                      width="250"
                      height="220"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <h2>{blog.title}</h2>
                    <p>{blog.body}</p>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "end",
                        p: 1,
                      }}
                    >
                      <p> {`${dayjs(blog?.createdAt).fromNow(true)}`} ago</p>
                    </Box>
                  </Grid>
                </Grid>
              </Link>
              {/* <button onClick={()=>deleteBlog(blog.id)}>delete blog</button> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BlogList;
