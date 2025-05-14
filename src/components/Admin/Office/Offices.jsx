import { useEffect, useContext, useState } from "react";
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
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

const Offices = () => {
  const { tinyapikey } = useContext(MyContext);
  const [offices, setOffices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newOffice, setNewOffice] = useState({ name: "", address: "" });

  const {api} = useContext(MyContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
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
    "align",
  ];

  const user_id = 1;

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      const res = await getOffices(`${api}/offices`);
      setOffices(res.data);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      toast.error("Failed to load office data.");
    }
  };

  const handleAddOffice = async () => {
    if (!newOffice.name.trim()) {
      toast.warning("Branch name is required.");
      return;
    }
    const data = {
      branch_name: newOffice.name,
      address: newOffice.address,
      user_id,
    };
    try {
      await createOffice(`${api}/offices`, data);
      await fetchOffices();
      setNewOffice({ name: "", address: "" });
      setActiveIndex(offices.length);
      toast.success("Office added successfully.");
    } catch (error) {
      console.error("Add office failed:", error);
      toast.error("Failed to add office.");
    }
  };

  const handleUpdateOffice = async (index) => {
    const office = offices[index];
    const data = {
      branch_name: office.branch_name,
      address: office.address,
    };
    try {
      await updateOffice(`${api}/offices/`, office.id, data);
      await fetchOffices();
      toast.success("Office updated successfully.");
    } catch (error) {
      console.error("Update office failed:", error);
      toast.error("Failed to update office.");
    }
  };

  const handleRemoveOffice = async (index) => {
    const id = offices[index].id;
    try {
      await deleteOffice(`${api}/offices/`, id);
      await fetchOffices();
      setActiveIndex(0);
      toast.success("Office removed.");
    } catch (error) {
      console.error("Remove office failed:", error);
      toast.error("Failed to remove office.");
    }
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
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-800 mb-1">
        Office Address
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">
        Add Registered Offices, Sales Office, Branch Office etc.
      </p>

      <Tab.Group selectedIndex={activeIndex} onChange={setActiveIndex}>
        <Tab.List className="flex overflow-x-auto scrollbar-hide gap-2 border-b border-gray-300 pb-2 mb-6">
          {offices.map((_, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
                  selected
                    ? "bg-indigo-700 text-white border-indigo-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`
              }
            >
              Office {index + 1}
            </Tab>
          ))}
          <Tab className="px-3 sm:px-4 py-2 rounded-t-md text-sm font-medium border bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
            <Plus size={16} className="inline mr-1" />
            Add New
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {offices.map((office, index) => (
            <Tab.Panel key={office.id}>
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
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
                <div className="mb-4">
                  {/* <ReactQuill
                    value={office.address}
                    onChange={(content) =>
                      handleEditorChangeExisting(content, index)
                    }
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="Enter address here..."
                  /> */}
                  <Editor
                    apiKey={tinyapikey}
                    value={office.address}
                    init={{
                      height: 400,
                      menubar: "file edit view insert format",
                      plugins: [
                        "advlist autolink lists link image charmap preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | link image table | code",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content) =>
                      handleEditorChangeExisting(content, index)
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-3 justify-end mt-4">
                  <button
                    onClick={() => handleRemoveOffice(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Remove Address
                  </button>
                  <button
                    onClick={() => handleUpdateOffice(index)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Update Address
                  </button>
                </div>
              </div>
            </Tab.Panel>
          ))}

          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
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
              <div className="mb-4">
                {/* <ReactQuill
                  value={newOffice.address}
                  onChange={handleEditorChangeNew}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Enter address here..."
                /> */}
<Editor
                    apiKey={tinyapikey}
                    value={newOffice.address}
                    init={{
                      height: 400,
                      menubar: "file edit view insert format",
                      plugins: [
                        "advlist autolink lists link image charmap preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | link image table | code",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={handleEditorChangeNew}
                  />
                
              </div>
              <div className="text-right">
                <button
                  onClick={handleAddOffice}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded text-sm"
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
