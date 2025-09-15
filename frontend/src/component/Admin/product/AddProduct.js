import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/AddProducts.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={product.category}
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
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            value={product.stock}
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
          <button type="submit" className="add-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
