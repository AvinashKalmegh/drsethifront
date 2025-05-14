import { useState, useEffect, useContext } from "react";
import { UploadCloud, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import MyContext from "../../../ContextApi/MyContext";

const Banner = () => {
  const { api, imgapi } = useContext(MyContext);
  const [loader, setLoader] = useState(false);

  const [form, setForm] = useState({
    title: "",
    text: "",
    width: "100",
    height: "400",
    image: null,
  });

  const [preview, setPreview] = useState("/assets/source-banner.jpg");

  // 👇 Fetch existing banner on load
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${api}/banner/`);
        const data = await res.json();
        if (data && data.image) {
          setForm({
            title: data.title || "",
            text: data.text || "",
            width: data.width || "100",
            height: data.height || "400",
            image: null, // we show existing image via preview
          });
          setPreview(`${imgapi}/${data.image}`);
        }
      } catch (err) {
        console.warn("No banner found.");
      }
    };

    fetchBanner();
  }, [api, imgapi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleReset = () => {
    setForm({ title: "", text: "", width: "100", height: "400", image: null });
    setPreview("/assets/source-banner.jpg");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("text", form.text);
    formData.append("width", form.width);
    formData.append("height", form.height);
    formData.append("created_by", 1); // Use actual logged-in user ID

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await fetch(`${api}/banner/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update banner");

      toast.success("✅ Banner updated!");
    } catch (err) {
      console.error("❌ Banner update error:", err);
      toast.error("❌ Banner update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 p-8">
      <h2 className="text-xl font-bold text-indigo-800 mb-2">Home Banner</h2>
      <p className="text-sm text-gray-600 mb-8">
        <span className="text-indigo-600">Customize</span> / Home Banner
      </p>

      <div className="relative w-full mb-10">
        <img
          src={preview}
          alt="Banner Preview"
          className="rounded-xl shadow-lg w-full object-cover border border-gray-300"
          style={{ height: `${form.height}px` }}
        />

        <form
          onSubmit={handleSubmit}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-6 w-[95%] max-w-4xl mt-50"
        >
          <h3 className="text-xl font-bold text-indigo-700 border-b pb-3 mb-5">
            UPDATE BANNER
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title (optional)</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Donec faucibus metus vel nunc auctor placerat."
                maxLength={150}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Max 150 characters allowed</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Text (optional)</label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                maxLength={250}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Max 250 characters allowed</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Width (%)</label>
              <input
                type="number"
                name="width"
                value={form.width}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Height (px)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Choose file</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
              <p className="text-xs text-gray-500 mt-2">
                Max size 3MB | JPG, JPEG, PNG only<br />
                Recommended: 1600x600px
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              <UploadCloud size={18} /> Update
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer inline-flex items-center gap-2 bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
            >
              <RefreshCw size={18} /> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
