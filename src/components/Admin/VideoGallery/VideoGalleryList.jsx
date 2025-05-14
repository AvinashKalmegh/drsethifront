// src/pages/VideoGalleryList.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AddCategoryModal from './AddCategoryModal';
import { PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getVideoCategories,
  addVideoCategory,
  updateVideoCategory,
  deleteVideoCategory,
  getAllVideos
} from './videoApi';
import { toast } from 'react-toastify';
import MyContext from '../../../ContextApi/MyContext';
import ConfirmDeleteModal from './ConfirmDelete';

export default function VideoGalleryList() {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [loader, setLoader] = useState(false);

  const [galleries, setGalleries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Load categories and count videos per category
useEffect(() => {
  const fetchData = async () => {
    try {
      const [categoryRes, videoRes] = await Promise.all([
        getVideoCategories(api),
        getAllVideos(api),
      ]);

      const categoriesWithCounts = categoryRes.map((cat) => {
        const videoCount = videoRes.filter(
          (vid) => vid.category_v === cat.Title
        ).length;

        return {
          id: cat.id,
          title: cat.Title,
          status: cat.Status,
          created: new Date(cat.created_at).toLocaleString(),
          totalPages: videoCount,
        };
      });

      setGalleries(categoriesWithCounts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load video categories or videos");
    }
  };

  fetchData();
}, [api]);

  const handleSaveCategory = async (category) => {
    try {
      if (category.id) {
        const updated = await updateVideoCategory(api, category.id, {
          Title: category.title,
          Status: category.status,
        });
        setGalleries((prev) =>
          prev.map((g) =>
            g.id === category.id
              ? {
                  ...g,
                  title: updated.Title,
                  status: updated.Status,
                  created: new Date(updated.created_at).toLocaleString(),
                }
              : g
          )
        );
        toast.success('✅ Category updated');
      } else {
        const added = await addVideoCategory(api, {
          Title: category.title,
          Status: category.status,
          user_id: 1,
        });
        setGalleries((prev) => [
          ...prev,
          {
            id: added.id,
            title: added.Title,
            status: added.Status,
            created: new Date(added.created_at).toLocaleString(),
            totalPages: 0,
          },
        ]);
        toast.success('✅ Category added');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to save category');
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
        <h2 className="text-xl font-extrabold tracking-tight text-zinc-800 drop-shadow-md">
         Video Gallery Categories
        </h2>
        <button
          onClick={() => {
            setEditCategory(null);
            setShowModal(true);
          }}
          className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-indigo-700 text-white px-3 py-1 md:px-5 md:py-2.5 rounded-xl font-semibold shadow-lg transition-all"
        >
          <PlusCircle className="w-5 h-5" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xl">
        <table className="min-w-full text-sm text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-left text-xs uppercase tracking-wider">
              <th className="p-4">#</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created On</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery, idx) => (
              <motion.tr
                key={gallery.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <td className="p-4 text-center font-medium">{idx + 1}</td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/video-gallery/${gallery.title}`)}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-900 hover:underline font-semibold transition-all"
                  >
                    {gallery.title}
                    <div className="text-xs text-gray-500 font-normal">
                      Total Videos: {gallery.totalPages}
                    </div>
                  </button>
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow ${
                    gallery.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {gallery.status}
                  </span>
                </td>
                <td className="p-4 text-center text-sm">{gallery.created}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory({
                        id: gallery.id,
                        title: gallery.title,
                        status: gallery.status,
                      });
                      setShowModal(true);
                    }}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-900 text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    className="cursor-pointer text-red-600 hover:text-red-800 text-lg"
                    onClick={async () => {
                      try {
                        await deleteVideoCategory(api, gallery.id);
                        setGalleries((prev) => prev.filter((g) => g.id !== gallery.id));
                        toast.success('✅ Category deleted');
                      } catch (err) {
                        console.error(err);
                        toast.error('❌ Failed to delete');
                      }
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

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
              isVideoCategory
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
