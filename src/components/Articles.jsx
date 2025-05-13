import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import contactBg from "../assets/about.jpg";
import Card from "./Card";
import { getAllMedia } from "./Admin/Media/mediaApi";
import { toast } from "react-toastify";
import MyContext from "../ContextApi/MyContext";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {api, preview} = useContext(MyContext);

   const loadMedia = async () => {
        try {
          const allMedia = await getAllMedia(api);
          console.log(allMedia)
          const filtered = allMedia.filter((item) => item.category === "Articles");
          setData(filtered);
          console.log("mediaaaaa", filtered);
        } catch (error) {
          console.error("Media fetch error:", error);
          toast.error("❌ Failed to load media");
        }
      };
      
  

  useEffect(() => {
    loadMedia();
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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
          <p className="text-2xl md:text-4xl font-semibold text-white">
          Articles
          </p>
        </div>
      </div>
      <Card books={data} category={"Articles"}/>
    </section>
  );
};

export default Articles;
