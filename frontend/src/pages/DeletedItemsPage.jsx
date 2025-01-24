import { useState, useEffect } from "react";
import axios from "axios";

import ItemList from "../components/ItemList";
import ErrorAlert from "../components/alerts/Error";

import { config } from "../../config/config";
import Loading from "./Loading";
import ErrorPage from "./Error";

const DeletedItemsPage = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BACKEND_URL = config.BACKEND_URL;
  const ROLE = config.ROLE;

  const fetchDeletedItems = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/v1/api/items/${ROLE}/deleted`
      );
      setDeletedItems(response.data);
    } catch (error) {
      console.error("Failed to fetch deleted items:", error);
      await ErrorAlert();
      setError("Could not load deleted items");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchDeletedItems();
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

  const handleRestoreItem = (item) => {
    // Logic to restore item would go here
    console.log("Restoring item:", item);
  };

  if (error) return <ErrorPage errorMessage={error} />;

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deleted Inventory Items</h1>

      <ItemList
        items={deletedItems}
        onEditItem={handleRestoreItem}
        onDeleteItem={() => {}}
      />
    </div>
  );
};

export default DeletedItemsPage;
