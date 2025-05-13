import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import contactBg from "../assets/about.jpg";
import Card from "./Card";
import PhotoGalleryList from "./PhotoGallery/PhotoGalleryList";
import MyContext from "../ContextApi/MyContext";

const Photos = () => {
  const [loading, setLoading] = useState(true);
  const {preview} = useContext(MyContext);

  useEffect(() => {
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
          Photos
          </p>
        </div>
      </div>
      <PhotoGalleryList/>
    </section>
  );
};

export default Photos;
