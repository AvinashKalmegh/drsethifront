// components/MainContent.jsx
import React, { useContext, useEffect, useState } from "react";

import Card from "./Card";
import { Helmet } from "react-helmet-async";
import MyContext from "../ContextApi/MyContext";
import axios from "axios";
import Loader from "./Loader/Loader";
import { getAllMedia } from "./Admin/Media/mediaApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [preview, setPreview] = useState("");
  const [booksPreview, setBooksPreview] = useState("");

  const { api, imgapi } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(api, imgapi)
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${api}/banner/`);
        const data = await res.json();
        // console.log(data)
        if (data && data.image) {
          setPreview(`${imgapi}/${data.image}`);
          console.log(`${imgapi}/${data.image}`);
        }
      } catch (err) {
        console.warn("No banner found.");
      }
    };

    fetchBanner();
  }, [api, imgapi]);

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [books, setBooks] = useState([]);

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

    const loadMedia = async () => {
      try {
        const allMedia = await getAllMedia(api);
        const filtered = allMedia.filter((item) => item.category === "Books");
        setBooks(filtered);
        console.log("mediaaaaa", filtered);
      } catch (error) {
        console.error("Media fetch error:", error);
        toast.error("❌ Failed to load media");
      }
    };
    loadMedia();

    fetchBlogData();
  }, [api]);

  if (loading) return <Loader />;

  return (
    <main>
      <Helmet>
        <title>Dr. Vikram Sethi - Professor</title>
      </Helmet>
      {/* Hero Section */}
      <section>
        <img
          src={preview}
          alt="Dr. Vikram Sethi"
          className="w-full h-auto mt-20"
        />
      </section>

      {/* Intro Section */}
      <section className="max-w-5xl mx-auto px-3 md:px-0 py-6">
        <p className="text-justify">
          Dr. Vikram Sethi is a professor at Wright State University, Raj Soin
          College of Business. He was founder and Director of the Institute of
          Defense Studies and Education and the Center of Professional Education
          at Wright State University. In parallel, he has over 20 years of
          experience in advising startup organizations with developing business
          success stories, funding, cash allocation and position, product
          development and market positioning activities in the United States. He
          is an ardent academic, a researcher and an entrepreneur.
        </p>
        <br />
        <p className="text-justify">
          Driven by the fundamental belief that our educational environment
          needs entrepreneurial and transformational efforts he has guided
          game-changing educational programs designed to meet the needs of an
          evolving society, globally dispersed organizations, and mobile
          individuals."
        </p>
      </section>

      {/* Quote Section */}
      <section className="text-center px-3 md:px-0 py-6">
        <h2 className="text-red-600 text-xl font-semibold">
          "The story begins only when the book closes." ~ Marshall McLuhan
        </h2>
        <p className="max-w-4xl mx-auto mt-4 text-justify">
          It is time to build a global cyber regime for the good of the global
          village. Mass communications has changed a lot since the first
          writings of Marshall McLuhan. Social media drives our beliefs and
          convictions; each on us has an electronic persona – living, breathing
          and growing – like we do; except we have very little control over it.
          Many of us have reached a point of acceptance that data about us has
          already been compromised. We live our lives with a sigh of “Oh, well!”
          We need to do better – personally, organizationally, socially,
          nationally and globally. We should support the formation of a global
          cyber regime which can act in our best interest through transnational
          partnerships and influences to encourage good cyber behavior by global
          actors and discourage bad actions by forceful deterrence.
        </p>
      </section>

      {/* Blogs Section */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600 mb-6">BLOGS</h2>
        <ul className="max-w-4xl mx-auto text-left text-sm space-y-2">
          {blogs.length > 0 &&
            blogs.map((el, i) => (
              <li
                key={i}
                onClick={() => navigate(`/blogs/${el.id}`)}
                className="cursor-pointer transition-all duration-200 hover:pl-3 hover:text-red-600 hover:font-medium"
              >
                <span className="text-red-600 font-bold">{'>'} </span>
                {el.title}
              </li>
            ))}
        </ul>
      </section>

      <Card books={books} category={"Books"} />
    </main>
  );
};

export default Home;
