import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { addVideoCategory, updateVideoCategory } from "./videoApi";
import MyContext from "../../../ContextApi/MyContext";

export default function AddCategoryModal({ onClose, onSave, editData }) {
  const isEdit = !!editData;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const { api, adminid } = useContext(MyContext);

  useEffect(() => {
    if (isEdit) {
      setTitle(editData.title);
      setStatus(editData.status);
    } else {
      setTitle("");
      setStatus("Active");
    }
  }, [editData, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.warn("⚠ Title cannot be empty");

    const payload = {
      Title: title,
      Status: status,
      user_id: adminid || 1
    };

    try {
      const response = isEdit
        ? await updateVideoCategory(api, editData.id, payload)
        : await addVideoCategory(api, payload);

      toast.success(`✅ Category ${isEdit ? "updated" : "added"} successfully`);
      onSave(response);
      onClose();
    } catch (error) {
      console.error("Category error:", error);
      toast.error("❌ Failed to save category");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4 border-b border-indigo-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-indigo-800">
                {isEdit ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={onClose}
                className="text-lg text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5 bg-white">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg px-4 py-2 transition shadow-sm"
                maxLength={150}
                placeholder="Enter category title"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Max 150 characters allowed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status *</label>
              <div className="mt-2 flex space-x-6">
                {["Active", "Inactive"].map((opt) => (
                  <label key={opt} className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={opt}
                      checked={status === opt}
                      onChange={() => setStatus(opt)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all"
              >
                {isEdit ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
