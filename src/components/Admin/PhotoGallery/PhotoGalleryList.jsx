// src/pages/PhotoGalleryList.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categoryApis";
import {fetchPhotos} from "./photoApi";
import { toast } from "react-toastify";
import MyContext from "../../../ContextApi/MyContext";
import ConfirmDeleteModal from "./ConfirmDelete";

export default function PhotoGalleryList() {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);

  const [galleries, setGalleries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 📥 Load categories from backend
 useEffect(() => {
  const fetchCategoriesAndPhotos = async () => {
    try {
      const [categories, photos] = await Promise.all([
        getCategories(api),
        fetchPhotos(api)
      ]);

      const categoryPhotoCounts = photos.reduce((acc, photo) => {
        const cat = photo.category;
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      const formatted = categories.map((cat) => ({
        id: cat.id,
        title: cat.Title,
        status: cat.Status,
        created: new Date(cat.created_at).toLocaleString(),
        totalPages: categoryPhotoCounts[cat.Title] || 0
      }));

      setGalleries(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories or photos");
    }
  };

  fetchCategoriesAndPhotos();
}, [api]);


  // 💾 Save or Update a category
  const handleSaveCategory = async (category) => {
    try {
      if (category.id) {
        const updated = await updateCategory(api, category.id, {
          Title: category.title,
          Status: category.status,
        });
        const updatedFormatted = {
          ...category,
          title: updated.Title,
          status: updated.Status,
          created: new Date(updated.created_at).toLocaleString(),
        };
        setGalleries((prev) =>
          prev.map((g) => (g.id === updated.id ? updatedFormatted : g))
        );
      } else {
        const added = await addCategory(api, {
          Title: category.title,
          Status: category.status,
          user_id: 1,
        });
        const newFormatted = {
          id: added.id,
          title: added.Title,
          status: added.Status,
          created: new Date(added.created_at).toLocaleString(),
          totalPages: 0,
        };
        setGalleries((prev) => [...prev, newFormatted]);
        toast.success("✅ Category added");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save category");
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
          📁 Photo Gallery Categories
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
              <th className="p-4">Photo Categories</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created On</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery, idx) => (
              <motion.tr
                key={gallery.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <td className="p-4 text-center font-medium">{idx + 1}</td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/photo-gallery/${gallery.title}`)
                    }
                    className="cursor-pointer text-indigo-600 hover:text-indigo-900 hover:underline font-semibold transition-all"
                  >
                    {gallery.title}
                    <div className="text-xs text-gray-500 font-normal">
                      Total Pages: {gallery.totalPages}
                    </div>
                  </button>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      gallery.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {gallery.status}
                  </span>
                </td>
                <td className="p-4 text-center text-sm">{gallery.created}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory({
                        id: gallery.id,
                        Title: gallery.title,
                        Status: gallery.status,
                      });
                      setShowModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-lg"
                    onClick={() => setDeleteTarget(gallery)}
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
      await deleteCategory(api, deleteTarget.id);
      setGalleries((prev) => prev.filter((g) => g.id !== deleteTarget.id));
      toast.success("✅ Category deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
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
