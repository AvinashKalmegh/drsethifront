// src/components/EditUser.jsx
import { X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditUser = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loader, setLoader] = useState(false);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!newPassword || newPassword.length > 30) {
      setError('Password is required and must be less than 30 characters.');
      return;
    }

    setError('');
    onSave(newPassword);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative border"
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">
              🔒 Reset Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">New Password *</label>
                <input
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                  maxLength={30}
                />
                <p className="text-xs text-gray-500 mt-1">Max 30 characters allowed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                  maxLength={30}
                />
                <p className="text-xs text-gray-500 mt-1">Re-enter password to confirm</p>
              </div>
            </div>

            {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}

            <div className="text-right mt-6">
              <button
                onClick={handleSubmit}
                className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-700"
              >
                Save Password
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUser;
