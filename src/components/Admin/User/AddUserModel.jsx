import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import MyContext from '../../../ContextApi/MyContext';

const AddUserModal = ({ isOpen, onClose, onRefresh }) => {

  const {api} = useContext(MyContext);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email:''
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'email') {
    setFormData((prev) => ({ ...prev, email: value, username: value }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};
  const handleSubmit = async () => {
    try {
      await axios.post(`${api}/register/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User added successfully');
      onRefresh(); // refresh user list in parent
      onClose();
    } catch (error) {
      toast.error('Failed to add user');  
    }
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative border"
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New User</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                  name="first_name"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  name="last_name"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-1">Username *</label>
                <input
                  disabled={true}
                  name="email"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                  value={formData.email}
                />
              </div> */}

                <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  name="email"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                  value={formData.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="text-right mt-6">
              <button
                className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-700"
                onClick={handleSubmit}
              >
                Add User
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;
