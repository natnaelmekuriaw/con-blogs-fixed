import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("natnael");
  const [isPosting, setPosting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // e.preventDefault();
    // const blogs = { title, body, author };
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
