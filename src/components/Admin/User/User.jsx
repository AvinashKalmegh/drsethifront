// Updated Users.jsx with real API integration and removed lastLogin, role, status

import { useContext, useEffect, useState } from 'react';
import { Pencil, PlusCircle } from 'lucide-react';
import AddUserModal from './AddUserModel';
import EditUser from './EditUser';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import MyContext from '../../../ContextApi/MyContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const {api} = useContext(MyContext)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${api}/admin/users/`);
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleResetPassword = async (newPassword) => {
    try {
      await axios.post(`${api}/admin/users/${selectedUserId}/reset-password/`, {
        password: newPassword,
        confirm_password: newPassword
      });
      toast.success('Password updated successfully');
      setIsResetOpen(false);
    } catch (error) {
      toast.error('Password update failed');
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await axios.post(`${api}/admin/users/create/`, userData);
      toast.success('User created successfully');
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-gray-900"
    >
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-800 drop-shadow-md">
          👤 Users
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition"
        >
          <PlusCircle className="w-5 h-5" /> Add User
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Users</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-center">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-800">{user.first_name} {user.last_name}</div>
                  <div className="text-xs text-gray-500">Username: {user.username}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3 flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsResetOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
      />

      <EditUser
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onSave={handleResetPassword}
      />
    </motion.div>
  );
};

export default Users;
