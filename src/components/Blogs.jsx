import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import contactBg from "../assets/about.jpg";
import Card from "./Card";
import BlogsCard from "./BlogsCard";
import axios from "axios";
import MyContext from "../ContextApi/MyContext";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const { api,imgapi, preview } = useContext(MyContext);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(`${api}/blogs/`);
        setBlogs(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [api]);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full bg-cover bg-center  mt-20 mb-10">
      <div
        className="relative w-full h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(73, 71, 71, 0.6)" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start md:px-40">
          <p className="text-2xl md:text-4xl font-semibold text-white">Blogs</p>
        </div>
      </div>
      {!loading && blogs.length > 0 && <BlogsCard blogs={blogs} imgapi={imgapi} />}
      {!loading && blogs.length <= 0 && (
        <p className="text-2xl md:text-4xl font-semibold text-white">
          No Blogs Found
        </p>
      )}
    </section>
  );
};

export default Blogs;
