import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";
import MyContext from "../../../ContextApi/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getMediaCategories,
  addMedia,
  getMediaById,
  updateMedia,
} from "./mediaApi";

export default function AddEditMedia() {
  const { tinyapikey, imgapi, api } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { mediaCategory, mediaId } = useParams();
  const [form, setForm] = useState({
    category: "",
    title: "",
    introduction: "",
    description: "",
    photo_upload: null,
    document: null,
  });
  const isEdit = !!mediaId;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("title", form.title);
    formData.append("introduction", form.introduction);
    formData.append("description", form.description);
    formData.append("user_id", 1); // Replace with dynamic user_id if available

    // Only append if it's a new file (i.e., user selected a new one)
    if (form.photo_upload instanceof File) {
      formData.append("photo_upload", form.photo_upload);
    }

    if (form.document instanceof File) {
      formData.append("document", form.document);
    }

    try {
      if (isEdit) {
        await updateMedia(api, mediaId, formData);
        toast.success("✅ Media updated successfully!");
        navigate(`/admin/media-gallery/${form.category}`);
      } else {
        await addMedia(api, formData);
        toast.success("✅ Media added successfully!");
        navigate(`/admin/media-gallery/${form.category}`);
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error("❌ Failed to submit media item");
    }
  };

  useEffect(() => {
    console.log(mediaCategory);
    const fetchData = async () => {
      console.log("catdata");

      try {
        const [catData, mediaData] = await Promise.all([
          getMediaCategories(api),
          isEdit ? getMediaById(api, mediaId) : Promise.resolve(null),
        ]);

        setCategories(catData);
        console.log("catdata", catData);

        if (isEdit && mediaData) {
          setForm({
            title: mediaData.title || "",
            introduction: mediaData.introduction || "",
            description: mediaData.description || "",
            category: mediaData.category || mediaCategory,
            status: mediaData.status || "Active",
            photo_upload: mediaData.photo_upload,
            document: mediaData.document,
          });
        } else {
          setForm((prev) => ({
            ...prev,
            category: mediaCategory, // default select the clicked one
          }));
        }
      } catch (err) {
        toast.error("❌ Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, mediaCategory, isEdit]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-10 bg-gray-50 min-h-screen">
      {/* LEFT: Form Fields */}
      <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-indigo-700 mb-6">
          ADD INFORMATION
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.Title}>
                  {cat.Title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              maxLength={150}
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Lorem ipsum dolor sit amet..."
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Max 150 Characters Allowed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Introduction
            </label>
            <textarea
              name="introduction"
              value={form.introduction}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Intro text..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Max 250 Characters Allowed
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>

            <ReactQuill
              value={form.description}
              onChange={(content) =>
                setForm((prev) => ({ ...prev, description: content }))
              }
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Enter description here..."
              style={{ height: "200px", marginBottom: "1rem" }}
            />
            {/* <Editor
              apiKey={tinyapikey} // Optional, safe to leave blank in dev
              value={form.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | preview",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content) =>
                setForm((prev) => ({ ...prev, description: content }))
              }
            /> */}
          </div>

          <div className="text-right">
            <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT: Attachments */}
      <div className="bg-purple-100 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-purple-800 mb-6">
          ADD ATTACHMENT
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block font-medium text-sm mb-1">
              Featured Image
            </label>
            <input
              type="file"
              name="photo_upload"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="block w-full"
            />
            <p className="text-xs mt-1 text-gray-600">
              Max Size: 2 MB. JPG, JPEG, PNG allowed. Recommended: 800x600px.
            </p>
            {isEdit && form.photo_upload && (
              <div className="mt-4">
                {/* <p className="font-semibold text-sm mb-1">DELETE ATTACHMENT</p> */}
                <img
                  src={`${imgapi}/${form.photo_upload}`}
                  alt="current"
                  className="w-full mt-2 rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">
              Add Document
            </label>
            <input
              type="file"
              name="document"
              accept=".pdf,.docx,.xlsx"
              onChange={handleFileChange}
              className="block w-full"
            />
            <p className="text-xs mt-1 text-gray-600">
              Max Size: 10 MB. Allowed: PDF, XLSX, DOCX.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
