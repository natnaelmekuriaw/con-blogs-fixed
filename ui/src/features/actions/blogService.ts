import axios from "axios";
import { BaseUrl } from "../utils/baseUrl";
import { Blog, NewBlog } from "../types";

// export const getBlogs = async () => {
//   try {
//     const response = await axios.get(`${BaseUrl()}/blogs`);
//     const data = response?.data;
//     // console.log("got fetch response", data);
//     return data;
//   } catch (error) {
//     console.log("got fetch error", `${BaseUrl()}/products`, error);
//     return false;
//   }
// };

export const getBlogs = async () => {
  try {
    const response = await fetch(`${BaseUrl()}/blogs`);
    const data = await response.json();
    console.log("got fetch response result", data);
    return data;
  } catch (error) {
    console.log("got fetch error", `${BaseUrl()}/products`, error);
  }
};

export const getOneBlog = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl()}/blogs/${id}`);
    const data = response?.data;
    // console.log("got fetch response", data);
    return data;
  } catch (error) {
    console.log("got fetch error", `${BaseUrl()}/products`, error);
    return false;
  }
};

export const createBlog = async (blog: NewBlog) => {
  // return blog;

  await axios
    .post(`${BaseUrl()}/blogs`, blog)
    .then((response) => {
      // console.log("got fetch response", data);
      return response;
    })
    .then((data) => {
      console.log("got post ", data);
      return data;
    })
    .catch((error) => {
      console.log("got post error", `${BaseUrl()}/blogs`, error?.response);
      const errors = error?.response?.data?.message;
      if (errors) return Promise.reject(errors);
      return Promise.reject(error);
    });
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await axios.delete(`${BaseUrl()}/blogs/${id}`);
    const data = response?.data;
    // console.log("got fetch response", data);
    return data;
  } catch (error) {
    console.log("got fetch error", `${BaseUrl()}/products`, error);
    return false;
  }
};
