import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { deleteBlog, getOneBlog } from "../../actions/blogService";
import { Blog } from "../../types";
import Create from "./Create";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState<Blog>();
  const isLoading = false;
  const err = "";
  const titles = ["Blogs", "My Blogs"];
  const navigate = useNavigate();

  const blogQuery = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => (id ? getOneBlog(id) : null),
  });

  const handleDelete = async () => {
    if (id) {
      const blog = await deleteBlog(id);
      toast.success("Blog pos", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  if (blogQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (blogQuery.isError) {
    return (
      <div className="err">
        <h2>Failed to fetch data</h2>
        <h2>{JSON.stringify(blogQuery.error)}</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="blog-details">
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
                src={blogQuery.data.image}
                alt="blog_image"
                //   width="250"
                //   height="220"
              />
            </Grid>
            <Grid item xs={12}>
              <h2>{blogQuery.data.title}</h2>
              <p>{blogQuery.data.body}</p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                  p: 1,
                }}
              >
                <p> {`${dayjs(blogQuery.data.createdAt).fromNow(true)}`} ago</p>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <button onClick={handleDelete}>Delete blog</button>
              </Box>
            </Grid>
          </Grid>
        </article>
      </div>
      <Routes>
        <Route path="create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default BlogDetail;
