import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { config } from "../../config/config";
import SuccessAlert from "./alerts/Success";
import ErrorAlert from "./alerts/Error";

const AddItemModal = ({ isOpen, onClose }) => {
  const BACKEND_URL = config.BACKEND_URL;
  const ROLE = config.ROLE;

  const [formData, setFormData] = useState({
    name: "",
    item_type: "",
    item_amount: 0,
    created_editor: ROLE,
    last_editor : ROLE,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/v1/api/items/${ROLE}`, formData);
      await SuccessAlert();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      await ErrorAlert();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Item Type</label>
            <input
              type="text"
              name="item_type"
              value={formData.item_type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Item Amount</label>
            <input
              type="number"
              name="item_amount"
              value={formData.item_amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddItemModal;
