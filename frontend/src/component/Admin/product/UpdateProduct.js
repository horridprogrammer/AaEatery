import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/UpdateProduct.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(-1);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="update-product-container">
      <h1 className="update-product-title">Update Product</h1>
      <form className="update-product-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter product description"
            value={product.description || ""}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter price"
            value={product.price || ""}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={product.category || ""}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="cake">Cake</option>
            <option value="brownie">Brownie</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Paste image link"
            value={product.image || ""}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            value={product.stock || ""}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            required
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="update-btn">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
