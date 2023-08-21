import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, getBlogs } from "../../actions/blogService";
import { NewBlog } from "../../types";
import { toast } from "react-toastify";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("natnael");
  const [isPosting, setPosting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });

  const postBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log("onsuccess", data);
      toast.success("blog posted successfully");
    },
    onError: (errors) => {
      if (Array.isArray(errors))
        errors.map((err) => {
          toast.error(`${err}`);
        });
      else toast.error(`${errors}`);
      console.log("err is", errors);
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const blog: NewBlog = {
      title,
      body,
      // author,
      image,
    };

    postBlogMutation.mutate(blog);
    // setPosting(true);

    // fetch("http://localhost:8181/blogs", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(blogs),
    // })
    //   .then(() => {
    //     setPosting(false);
    //     console.log("Blog added successfuly");
    //     navigate("/");
    //   })
    //   .catch((e) => {
    //     console.log("failed to post blog due to error", e);
    //   });
  };

  return (
    <div className="create">
      {blogsQuery.data.length}
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Blog body :</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={5}
        ></textarea>
        <label>Blog author :</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Natnael">Natnael</option>
          <option value="Hilina">Hilina</option>
          <option value="Mastewal">Mastewal</option>
        </select>
        <label>Image url:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Box sx={{ p: 2 }}>
          {!isPosting && <button>Post Blog</button>}
          {isPosting && <button>Posting...</button>}
        </Box>
      </form>
    </div>
  );
};
export default Create;
