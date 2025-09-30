import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/ProductInventory.css"; 

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.BACKEND_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.BACKEND_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cake-inventory-container">
      <div className="cake-inventory-header">
        <h1>🎂 Product Inventory</h1>
        <button
          className="add-btn"
          onClick={() => navigate("/admin/addproduct")}
        >
          ➕ Add Product
        </button>
      </div>

      <div className="table-wrapper">
        <table className="cake-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Image</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((x) => (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td>{x.description}</td>
                  <td>{x.price}</td>
                  <td className="category-cell">{x.category}</td>
                  <td>
                    {x.image ? (
                      <img
                        src={x.image}
                        alt={x.name}
                        className="cake-image"
                      />
                    ) : (
                      <span className="no-image">No Image</span>
                    )}
                  </td>
                  <td>{x.stock}</td>
                  <td className="action-buttons">
                    <button
                      className="update-btn"
                      onClick={() => navigate(`/admin/updateproduct/${x.id}`)}
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(x.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInventory;
