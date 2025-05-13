// src/pages/AddEditPhoto.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { createPhoto, getPhotoById, updatePhoto } from './photoApi';
import { getCategories } from './categoryApis';
import MyContext from '../../../ContextApi/MyContext';

export default function AddEditPhoto() {
  const { id, photoId , category} = useParams();
  const navigate = useNavigate();
  const isEdit = !!photoId;
  const { api, adminid, imgapi } = useContext(MyContext);

  const [form, setForm] = useState({
    category: category,
    image: null,
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.warn('⚠ Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append('category', form.category);
    formData.append('user_id', adminid || 1);

    if (form.image && typeof form.image === 'object') {
      formData.append('photo_upload', form.image);
    }

    try {
      if (isEdit) {
        await updatePhoto(api, photoId, formData);
        toast.success('✅ Photo updated successfully');
      } else {
        await createPhoto(api, formData);
        toast.success('✅ Photo added successfully');
      }
      setTimeout(() => navigate(`/admin/photo-gallery/${category}`), 1500);
    } catch (error) {
      console.error('Photo error:', error);
      toast.error('❌ Failed to save photo');
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories(api);
        const active = data.filter((cat) => cat.Status === 'Active');
        setCategories(active.map((cat) => cat.Title));
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to load categories');
      }
    };

    const loadPhoto = async () => {
      try {
        const data = await getPhotoById(api, photoId);
        setForm({
          category: data.category || '',
          image: data.photo_upload || null,
        });
      } catch (error) {
        toast.error('❌ Failed to fetch photo');
      }
    };

    loadCategories();
    if (isEdit) loadPhoto();
  }, [api, photoId, isEdit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 mt-6 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">
        {isEdit ? 'Edit Photo' : 'Add New Photo'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
          />
        </div>

        {isEdit && form.image && typeof form.image === 'string' && (
          <div>
            <img
              src={`${imgapi}/${form.image}`}
              alt="Current"
              className="w-full h-40 object-cover rounded border"
            />
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-600"
          >
            {isEdit ? 'Update' : 'Add'} Photo
          </button>
        </div>
      </form>
    </motion.div>
  );
}
