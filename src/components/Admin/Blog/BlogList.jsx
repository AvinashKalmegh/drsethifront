// src/pages/BlogList.jsx
import { useContext, useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { motion } from "framer-motion";
import { fetchBlogs, deleteBlog } from "./blogApis";
import MyContext from "../../../ContextApi/MyContext";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { api, imgapi } = useContext(MyContext);

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs(api);
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };
    loadBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-gray-900"
    >
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-800 drop-shadow-md">
          📝 Blog Posts
        </h2>
        <Link
          to="/admin/blog/add"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition"
        >
          <PlusCircle className="w-5 h-5" /> Add Blog
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Thumbnail</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created On</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, i) => (
              <tr key={blog.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-center">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-800">
                    {blog.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    Posted by: {blog.author}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <img
                    src={`${imgapi}/${blog.image}`}
                    alt="thumb"
                    className="w-16 h-12 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shadow ${
                      blog.status === true
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {blog.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {new Date(blog.created_at)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, ".")}
                  <br />
                  {new Date(blog.created_at).toLocaleTimeString()}
                </td>{" "}
                <td className="px-4 py-3 flex justify-center gap-3">
                  <Link to={`/admin/blog/edit/${blog.id}`}>
                    <Pencil
                      size={18}
                      className="text-blue-600 hover:text-blue-800"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedId(blog.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2
                      size={18}
                      className="text-red-600 hover:text-red-800"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(selectedId)}
      />
    </motion.div>
  );
};

export default BlogList;
