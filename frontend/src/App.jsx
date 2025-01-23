import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ActiveItemsPage from './pages/ActiveItemsPage';
import DeletedItemsPage from './pages/DeletedItemsPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Inventory Management</h1>
            <div className="space-x-4">
              <Link 
                to="/" 
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Active Items
              </Link>
              <Link 
                to="/deleted" 
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Deleted Items
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ActiveItemsPage />} />
          <Route path="/deleted" element={<DeletedItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;