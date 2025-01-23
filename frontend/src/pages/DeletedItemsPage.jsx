import  { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';

const DeletedItemsPage = () => {
  const [deletedItems, setDeletedItems] = useState([]);

  // Simulated fetch function for deleted items
  const fetchDeletedItems = () => {
    const mockDeletedItems = [
      { id: 3, name: 'Old Tablet', item_type: 'Electronics', item_amount: 5 }
    ];
    setDeletedItems(mockDeletedItems);
  };

  useEffect(() => {
    fetchDeletedItems();
  }, []);

  const handleRestoreItem = (item) => {
    // Logic to restore item would go here
    console.log('Restoring item:', item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deleted Inventory Items</h1>

      <ItemList 
        items={deletedItems} 
        onEditItem={handleRestoreItem}
        onDeleteItem={() => {}} // No-op for deleted items page
      />
    </div>
  );
};

export default DeletedItemsPage;