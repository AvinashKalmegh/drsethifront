import React from "react";


import { useNavigate } from "react-router-dom";


const BlogsCard = ({ blogs, imgapi }) => {
  const navigate = useNavigate();
  // console.log(`${imgapi}${blogs[0].image}`);
  return (
    <section className="text-center py-10 px-4">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => navigate(`/blogs/${blog.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`${imgapi}${blog.image}`}
              alt={`Blog ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-left">
              <p className="text-sm text-red-600 font-semibold mb-2">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
              <h3 className="font-medium text-gray-800 leading-snug line-clamp-2">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsCard;
