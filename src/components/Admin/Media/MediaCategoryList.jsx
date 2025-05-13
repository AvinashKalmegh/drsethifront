// src/pages/media/MediaCategoryList.jsx
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MyContext from "../../../ContextApi/MyContext";
import {
  getMediaCategories,
  deleteMediaCategory,
  addMediaCategory,
  updateMediaCategory,
} from "./mediaApi";
import { toast } from "react-toastify";
import AddCategoryModal from "./AddCategoryModal";
import ConfirmDeleteModal from "./ConfirmDelete";

export default function MediaCategoryList() {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getMediaCategories(api);
        const formatted = data.map((cat) => ({
          id: cat.id,
          title: cat.Title,
          status: cat.Status,
          created: new Date(cat.created_at).toLocaleString(),
        }));
        setCategories(formatted);
      } catch (err) {
        toast.error("❌ Failed to load categories");
      }
    };

    fetchCategories();
  }, [api]);

  const handleSaveCategory = async (category) => {
    try {
      if (category.id) {
        const updated = await updateMediaCategory(api, category.id, {
          Title: category.title,
          Status: category.status,
        });
        setCategories((prev) =>
          prev.map((g) =>
            g.id === updated.id
              ? {
                  ...g,
                  title: updated.Title,
                  status: updated.Status,
                  created: new Date(updated.created_at).toLocaleString(),
                }
              : g
          )
        );
        toast.success("✅ Category updated");
      } else {
        const added = await addMediaCategory(api, {
          Title: category.title,
          Status: category.status,
          user_id: 1,
        });
        setCategories((prev) => [
          ...prev,
          {
            id: added.id,
            title: added.Title,
            status: added.Status,
            created: new Date(added.created_at).toLocaleString(),
          },
        ]);
        toast.success("✅ Category added");
      }
    } catch (err) {
      toast.error("❌ Save failed");
    } finally {
      setShowModal(false);
      setEditCategory(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-800 drop-shadow-md">
          🖼️ Media Gallery Categories
        </h2>
        <button
          onClick={() => {
            setEditCategory(null);
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all"
        >
          <PlusCircle className="w-5 h-5" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xl">
        <table className="min-w-full text-sm text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-left text-xs uppercase tracking-wider">
              <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <motion.tr
                key={cat.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <td className="p-4 text-center font-medium">{idx + 1}</td>
                <td
                  onClick={() =>{
                    console.log("aaaaaaaaaaaaa",cat.title)
                    navigate(`/admin/media-gallery/${cat.title}`)
                  }
                  }
                  className="p-4 font-semibold text-indigo-700 cursor-pointer"
                >
                  {cat.title}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      cat.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>
                <td className="p-4 text-center text-sm">{cat.created}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory(cat);
                      setShowModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-lg"
                    onClick={() => setDeleteTarget(cat)}
                  >
                    🗑️
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          try {
            await deleteMediaCategory(api, deleteTarget.id);
            setCategories((prev) =>
              prev.filter((cat) => cat.id !== deleteTarget.id)
            );
            toast.success("✅ Category deleted successfully");
          } catch (error) {
            toast.error("❌ Failed to delete category");
          } finally {
            setDeleteTarget(null);
          }
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <AddCategoryModal
              onClose={() => setShowModal(false)}
              onSave={handleSaveCategory}
              editData={editCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
