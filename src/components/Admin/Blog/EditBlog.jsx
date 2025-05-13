// src/pages/EditBlog.jsx
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogById, updateBlog } from "./blogApis"; // Adjust path if needed
import MyContext from "../../../ContextApi/MyContext";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = ({ isEdit = false}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const { blogId } = useParams(); // assuming route is /admin/blog/edit/:blogId
  const { imgapi, api, tinyapikey } = useContext(MyContext);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("status", status);
    if (image && typeof image === "object") {
      formData.append("image", image);
    }

    try {
      await updateBlog(api, blogId, formData);
      toast.success("✅ Blog updated successfully!");
      setTimeout(() => navigate("/admin/blog"), 1500);
    } catch (error) {
      toast.error("❌ Failed to update blog");
      console.error(error);
    }
  };

 useEffect(() => {
  const loadBlog = async () => {
    try {
      const data = await getBlogById(api, blogId);
      console.log("blog edit", data);
      setTitle(data.title || "");
      setContent(data.description || "");
      setStatus(data.status === true); // ensure boolean
      setImage(data.image || null); // store image path
    } catch (error) {
      toast.error("Failed to fetch blog data");
    }
  };

  if (isEdit) loadBlog();
}, [api, blogId, isEdit]);

 const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // ✅ alignment options
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align", // ✅ required to apply align
  ];


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-gray-900"
    >
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">
        {isEdit ? "Update" : "Add"} Blog
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Ex: Lorem ipsum..."
              maxLength={150}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
              <ReactQuill
                                    value={content}
                                    onChange={(newValue) => setContent(newValue)}
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Enter description here..."
                                    style={{ height: "200px", marginBottom: "1rem" }}
                                  />
            {/* <Editor
              apiKey={tinyapikey}
              value={content}
              init={{
                height: 300,
                menubar: false,
                plugins: "link image code lists",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist",
              }}
              onEditorChange={(newValue) => setContent(newValue)}
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 mt-15">Status *</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={status === true}
                  onChange={() => setStatus(true)}
                  className="accent-indigo-600"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === false}
                  onChange={() => setStatus(false)}
                  className="accent-indigo-600"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-700"
            onClick={handleSubmit}
          >
            {isEdit ? "Update Blog" : "Add Blog"}
          </button>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl shadow border border-indigo-200">
          <label className="block text-sm font-medium mb-2">
            {isEdit ? "Update Image" : "Add Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />
          <p className="text-xs mt-2 text-gray-600">
            Max 2MB. Only JPG, JPEG, PNG. Recommended size 800x600.
          </p>

          {isEdit && image && (
            <div className="mt-4">
              {/* <p className="font-semibold text-sm mb-1">DELETE ATTACHMENT</p> */}
              <img
                src={`${imgapi}/${image}`}
                alt="current"
                className="w-full mt-2 rounded border"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EditBlog;
