// src/components/ConfirmDeleteModal.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDeleteModal({ isOpen, onCancel, onConfirm, title = "Delete Category", message = "Are you sure you want to delete this category?" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-bold text-red-600 mb-3">{title}</h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="cursor-pointer px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="cursor-pointer px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
