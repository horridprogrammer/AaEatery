import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../css/Product.css"; // Import cake theme CSS

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchDetail = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail(id);
  }, [id]);

  return (
    <div className="cake-product-container">
      <div className="cake-product-card">
        <h1 className="cake-product-title">{data.name}</h1>
        <div className="cake-product-image-wrapper">
          <img
            src={`http://localhost:8080/uploads/${data.imageUrl}`}
            alt={data.name}
            className="cake-product-image"
          />
        </div>
        <div className="cake-product-details">
          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Price:</strong> ₹ {data.price}</p>
          <p><strong>Stock:</strong> {data.stock}</p>
        </div>
        <div className="cake-product-buttons">
          <button className="cake-btn add-cart">Add to Cart</button>
          <button className="cake-btn buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
