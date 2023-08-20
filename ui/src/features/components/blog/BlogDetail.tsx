import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getOneBlog, deleteBlog } from "../../actions/blogService";
import { Blog } from "../../types";
import Create from "./Create";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState<Blog>();
  const isLoading = false;
  const err = "";
  const titles = ["Blogs", "My Blogs"];
  const navigate = useNavigate();

  const getBlog = async () => {
    if (id) {
      const blog = await getOneBlog(id);
      setBlogs(blog);
      console.log("we have", blog);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  const handleDelete = async () => {
    if (id) {
      const blog = await deleteBlog(id);
      toast.success("Blog deleted successfuly !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    //   fetch('http://localhost:8181/blogs/' + blog.id, {
    //       method: 'DELETE',
    //       headers: { "Content-type": "application/json" },
    //   })
    //       .then(() => {
    //           console.log('Blog deleted successfuly');
    //           navigate('/');
    //       })
    //       .catch((e) => {
    //           console.log('failed to delete blog due to ', e)
    //       })
  };
  return (
    <div>
      <div className="blog-details">
        {err && <div className="err">{err}</div>}
        {isLoading && <div className="err">Loading...</div>}

        {blog && (
          <article>
            <Grid container>
              <Grid
                item
                xs={12}
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
                  //   width="250"
                  //   height="220"
                />
              </Grid>
              <Grid item xs={12}>
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
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <button onClick={handleDelete}>Delete blog</button>
                </Box>
              </Grid>
            </Grid>
          </article>
        )}
      </div>
      <Routes>
        <Route path="create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default BlogDetail;
