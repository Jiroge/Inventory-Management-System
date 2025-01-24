import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import ItemList from "../components/ItemList";
import AddItemModal from "../components/AddItemModal";
import EditItemModal from "../components/EditItemModal";
import ErrorPage from "./Error";

import { config } from "../../config/config";
import Loading from "./Loading";
import ErrorAlert from "../components/alerts/Error";

const ActiveItemsPage = () => {
  const [activeItems, setActiveItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BACKEND_URL = config.BACKEND_URL;
  const ROLE = config.ROLE;

  const fetchActiveItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/v1/api/items/${ROLE}`);
      setActiveItems(response.data);
    } catch (error) {
      console.error("Failed to fetch active items:", error);
      await ErrorAlert();
      setError("Could not load items");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchActiveItems();
      } catch (err) {
        console.error("Failed to useEffect fetch active items:", err);
        await ErrorAlert();
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);

    try {
      const response = await fetch(
        `${BACKEND_URL}/v1/api/items/${ROLE}/search?name=${term}`
      );
      const filteredItems = await response.json();

      setActiveItems(filteredItems);
    } catch (error) {
      console.error("Error during search:", error);
      ErrorAlert();
    }
  };

  const handleDeleteItem = async (item) => {
    if (!item) return;

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
            `${BACKEND_URL}/v1/api/items/${ROLE}/${item.id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete item");
          }

          const updatedActiveItems = (activeItems || []).filter(
            (activeItem) => activeItem && activeItem.id !== item.id
          );

          setActiveItems(updatedActiveItems);
          Swal.fire({
            title: "Deleted!",
            text: "Item deleted successfully!",
            icon: "success",
          });
        }
      })
      .catch(async (error) => {
        console.error("Error deleting item:", error.message);
        await ErrorAlert();
        setError(`Error: ${error.message}`);
      });
  };

  if (error) return <ErrorPage errorMessage={error} />;

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Active Inventory Items</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Item
        </button>
      </div>

      {activeItems.length > 0 && (
        <ItemList
          items={activeItems}
          onEditItem={(item) => {
            setCurrentItem(item);
            setIsEditModalOpen(true);
          }}
          onDeleteItem={handleDeleteItem}
        />
      )}

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={async () => {
          setIsAddModalOpen(false);
          await fetchActiveItems();
        }}
      />

      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={async () => {
          setIsEditModalOpen(false);
          await fetchActiveItems();
        }}
        initialData={currentItem}
      />
    </div>
  );
};

export default ActiveItemsPage;
