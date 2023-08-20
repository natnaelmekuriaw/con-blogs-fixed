import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <Box sx={{ py: 30 }}>
        <h1>Error 404</h1>
        <h2>Sorry, Page Not Found</h2>
        <Link to="/">Go Home</Link>
      </Box>
    </div>
  );
};

export default PageNotFound;
