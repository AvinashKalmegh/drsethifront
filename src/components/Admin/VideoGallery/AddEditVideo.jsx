// src/pages/AddEditVideo.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { addVideo, getVideoById, updateVideo, getVideoCategories } from './videoApi';
import MyContext from '../../../ContextApi/MyContext';

export default function AddEditVideo() {
  const { id, videoId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!videoId;
  const { api } = useContext(MyContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    video_link: '',
    video_from: '',
    category_v: id || '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, videoData] = await Promise.all([
          getVideoCategories(api),
          isEdit ? getVideoById(api, videoId) : Promise.resolve(null),
        ]);

        setCategories(catData);

        if (videoData) {
          setForm({
            title: videoData.title || '',
            description: videoData.description || '',
            video_link: videoData.video_link || '',
            video_from: videoData.video_from || '',
            category_v: videoData.category_v || id || '',
          });
        }
      } catch (error) {
        toast.error('❌ Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, videoId, isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, user_id: 1 };
      if (isEdit) {
        await updateVideo(api, videoId, payload);
        toast.success('✅ Video updated successfully');
      } else {
        await addVideo(api, payload);
        toast.success('✅ Video added successfully');
      }
      navigate(`/admin/video-gallery/${form.category_v}`);
    } catch (error) {
      toast.error('❌ Failed to save video');
    }
  };

  if (loading) return <div className="text-center py-10 text-lg font-medium">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 mt-6 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">
        {isEdit ? 'Edit Video' : 'Add New Video'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Video Link</label>
          <input
            type="url"
            name="video_link"
            value={form.video_link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Video From</label>
          <input
            type="text"
            name="video_from"
            value={form.video_from}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="category_v"
            value={form.category_v}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
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

        <div className="text-right">
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-600"
          >
            {isEdit ? 'Update' : 'Add'} Video
          </button>
        </div>
      </form>
    </motion.div>
  );
}
