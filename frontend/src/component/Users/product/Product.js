import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/Product.css"; // Import cake theme CSS

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetail = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.BACKEND_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail(id);
  }, [id]);

  const handleAddToCart = async ()=>{
    const token = localStorage.getItem("token");
    const response = await axios.post(`${process.env.BACKEND_URL}/api/cart`,null,{
      params:{
        proId:  data.id,
        email: localStorage.getItem("email")
      },
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  return (
    <div className="cake-product-container">
      <div className="cake-product-card">
        <h1 className="cake-product-title">{data.name}</h1>
        <div className="cake-product-image-wrapper">
          <img
            src={`${process.env.BACKEND_URL}/uploads/${data.imageUrl}`}
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
          <button className="cake-btn add-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="cake-btn buy-now">Buy Now</button>
          <button className="cake-btn back" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
