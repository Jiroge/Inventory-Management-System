import PropTypes from "prop-types";
import WarningAlert from "./alerts/Warning";

const ItemList = ({ items, onEditItem, onDeleteItem }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Created DAte</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(items || []).map(
            (item) =>
              item && (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{item.id}</td>
                  <td className="border p-2">{item.name || "Unnamed Item"}</td>
                  <td className="border p-2">{item.item_type || "Unknown"}</td>
                  <td className="border p-2 text-center">
                    {Number(item.price).toLocaleString() || "Unknown"}
                  </td>
                  <td className="border p-2 text-center">
                    {Number(item.item_amount).toLocaleString() || 0}
                  </td>
                  <td className="border p-2 text-center">
                    {new Date(item.created_date).toLocaleDateString() ||
                      "Unknown"}
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      {item.item_status === 1 ? (
                        <>
                          <button
                            onClick={() => onEditItem(item)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => onDeleteItem(item)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => WarningAlert()}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      item_type: PropTypes.string,
      item_amount: PropTypes.number,
    })
  ).isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ItemList;
