// src/pages/AddEditPhoto.jsx
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import MyContext from "../../../ContextApi/MyContext";
import { toast } from "react-toastify";
import { createBlog } from "./blogApis";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddEditPhoto() {
  const { id, photoId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!photoId;
  const [loader, setLoader] = useState(false);

  const { api, adminid, tinyapikey } = useContext(MyContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"], // ✅ link and image insert
      ["clean"],
      ["code-block"],
      ["table"], // needs extra lib to fully support UI buttons
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "code-block",
    "table",
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleEditorChange = (value) => {
    setForm({ ...form, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("status", form.status === "Active");
    formData.append("user_id", adminid); // ⚠️ Replace with actual user ID or auth logic

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      setLoader(true);
      await createBlog(api, formData);
      setLoader(false);
      toast.success("✅ Blog added successfully!");
      setTimeout(() => navigate("/admin/blog"), 1500); // Slight delay before redirect
    } catch (error) {
      setLoader(false);
      console.error("Create Blog Error:", error);
      toast.error("❌ Failed to add blog. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white p-10 mt-6 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-xl font-bold text-indigo-800 mb-6">
        {isEdit ? "Edit Blog" : "Add New Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          {/* <ReactQuill
            value={form.description}
            onChange={handleEditorChange}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Enter description here..."
            style={{ height: "250px", marginBottom: "1rem" }}
          /> */}
          <Editor
            apiKey={tinyapikey}
            value={form.description}
            init={{
              height: 400,
              menubar: "file edit view insert format",
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image table | code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(value) => setForm({ ...form, description: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 mt-20 md:mt-15">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="text-right">
          <button
            disabled={loader}
            onClick={handleSubmit}
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-600"
          >
            {" "}
            {loader ? "Loading..." : `${isEdit ? "Update" : "Add"} Blog`}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
