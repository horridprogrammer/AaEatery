import axios from "axios";
import { useEffect, useState } from "react";
import "../../../css/DisplayProducts.css"; // Import cake theme styles
import { useNavigate } from "react-router-dom";

const DisplayProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.BACKEND_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchDetails();
  }, []);

  const handleOnclick = (id) =>{
    navigate(`/user/product/${id}`)
  }

  return (
    <div className="cake-container">
      <h1 className="cake-title">Our Sweet Products</h1>
      <div className="cake-grid">
        {products.map((x) => (
          <div className="cake-card" key={x.id}>
            <img
              src={x.imageUrl}
              alt={x.name}
              className="cake-image"
            />
            <div className="cake-card-content" onClick={(e)=>handleOnclick(x.id)}>
              <h2 className="cake-card-name">{x.name}</h2>
              <p className="cake-card-price">₹ {x.price}</p>
              <p className="cake-card-stock">In Stock: {x.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProduct;
