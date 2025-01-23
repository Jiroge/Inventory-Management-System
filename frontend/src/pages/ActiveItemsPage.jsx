import  { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';

const ActiveItemsPage = () => {
  const [activeItems, setActiveItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Simulated fetch function
  const fetchActiveItems = () => {
    const mockActiveItems = [
      { id: 1, name: 'Laptop', item_type: 'Electronics', item_amount: 15 },
      { id: 2, name: 'Smartphone', item_type: 'Electronics', item_amount: 22 }
    ];
    setActiveItems(mockActiveItems);
  };

  useEffect(() => {
    fetchActiveItems();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredItems = activeItems.filter(item => 
      item && item.name && 
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setActiveItems(filteredItems);
  };

  const handleAddItem = (itemData) => {
    if (!itemData) return;

    const newItem = {
      id: activeItems.length > 0 ? Math.max(...activeItems.map(i => i.id)) + 1 : 1,
      ...itemData
    };
    setActiveItems(prev => [...(prev || []), newItem]);
    setIsAddModalOpen(false);
  };

  const handleEditItem = (itemData) => {
    if (!itemData || !currentItem) return;

    setActiveItems(prev => 
      (prev || []).map(item => 
        item && item.id === currentItem.id ? { ...item, ...itemData } : item
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteItem = (item) => {
    if (!item) return;

    const updatedActiveItems = (activeItems || []).filter(
      activeItem => activeItem && activeItem.id !== item.id
    );
    
    setActiveItems(updatedActiveItems);
  };

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

      <ItemList 
        items={activeItems} 
        onEditItem={(item) => {
          setCurrentItem(item);
          setIsEditModalOpen(true);
        }}
        onDeleteItem={handleDeleteItem}
      />

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />

      <EditItemModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditItem}
        initialData={currentItem}
      />
    </div>
  );
};

export default ActiveItemsPage;