import { useEffect, useContext, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import { Tab } from "@headlessui/react";
import { Plus } from "lucide-react";
import MyContext from "../../../ContextApi/MyContext";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from "./officeService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Offices = () => {
  const { tinyapikey } = useContext(MyContext);
  const [offices, setOffices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newOffice, setNewOffice] = useState({ name: "", address: "" });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // ✅ alignment options
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align", // ✅ required to apply align
  ];

  // Replace with logged-in user ID
  const user_id = 1;

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    const res = await getOffices();
    setOffices(res.data);
  };

  const handleAddOffice = async () => {
    if (!newOffice.name.trim()) return;
    const data = {
      branch_name: newOffice.name,
      address: newOffice.address,
      user_id,
    };
    await createOffice(data);
    await fetchOffices();
    setNewOffice({ name: "", address: "" });
    setActiveIndex(offices.length); // Move to newly added tab
  };

  const handleUpdateOffice = async (index) => {
    const office = offices[index];
    const data = {
      branch_name: office.branch_name,
      address: office.address,
    };
    await updateOffice(office.id, data);
    await fetchOffices();
  };

  const handleRemoveOffice = async (index) => {
    const id = offices[index].id;
    await deleteOffice(id);
    await fetchOffices();
    setActiveIndex(0);
  };

  const handleChangeExisting = (e, index) => {
    const { name, value } = e.target;
    const updated = [...offices];
    updated[index][name] = value;
    setOffices(updated);
  };

  const handleEditorChangeExisting = (content, index) => {
    const updated = [...offices];
    updated[index].address = content;
    setOffices(updated);
  };

  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    setNewOffice((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChangeNew = (content) => {
    setNewOffice((prev) => ({ ...prev, address: content }));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-800 mb-1">
        Office Address
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Add Registered Offices, Sales Office, Branch Office etc.
      </p>

      <Tab.Group selectedIndex={activeIndex} onChange={setActiveIndex}>
        <Tab.List className="flex gap-2 border-b border-gray-300 pb-2 mb-6">
          {offices.map((_, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `px-4 py-2 rounded-t-md text-sm font-medium border ${
                  selected
                    ? "bg-indigo-700 text-white border-indigo-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`
              }
            >
              Office {index + 1}
            </Tab>
          ))}
          <Tab className="px-4 py-2 rounded-t-md text-sm font-medium border bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
            <Plus size={16} className="inline mr-1" />
            Add New
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {offices.map((office, index) => (
            <Tab.Panel key={office.id}>
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
                <label className="block text-sm font-medium mb-1">
                  Branch Name *
                </label>
                <input
                  type="text"
                  name="branch_name"
                  value={office.branch_name}
                  onChange={(e) => handleChangeExisting(e, index)}
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                />
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <ReactQuill
                  value={office.address}
                  onChange={(content) =>
                    handleEditorChangeExisting(content, index)
                  }
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Enter address here..."
                  style={{ height: "200px", marginBottom: "1rem" }}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleRemoveOffice(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm mt-10"
                  >
                    Remove Address
                  </button>
                  <button
                    onClick={() => handleUpdateOffice(index)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm mt-10"
                  >
                    Update Address
                  </button>
                </div>
              </div>
            </Tab.Panel>
          ))}

          {/* Add New Panel */}
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
              <label className="block text-sm font-medium mb-1">
                Branch Name *
              </label>
              <input
                type="text"
                name="name"
                value={newOffice.name}
                onChange={handleChangeNew}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                placeholder="Ex: Registered Office"
              />
              <label className="block text-sm font-medium mb-1">Address</label>
              <ReactQuill
                value={newOffice.address}
                onChange={handleEditorChangeNew}
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="Enter address here..."
                style={{ height: "200px", marginBottom: "1rem" }}
              />
              <div className="text-right mt-4">
                <button
                  onClick={handleAddOffice}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded mt-10"
                >
                  Add Address
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Offices;
