import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../../../css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/cart/user/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched cart:", response.data);
        setCart(response.data);

        // Calculate total when cart is fetched
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  const handleChange = (action, id) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    let updatedCart = cart.map((item) => {
      if (item.id === id) {
        let newQuantity = item.quantity;

        if (action === "+") {
          if (newQuantity < item.product.stock) {
            newQuantity += 1;
            axios
              .post(
                `${process.env.BACKEND_URL}/api/cart`,
                null,
                {
                  params: {
                    proId: item.product.id,
                    email: email,
                  },
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .catch((err) => console.error("Error adding item:", err));
          }
        } else if (action === "-") {
          newQuantity -= 1;
          axios
            .delete(`${process.env.BACKEND_URL}/api/cart/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .catch((err) => console.error("Error deleting item:", err));
          window.location.reload();
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    updatedCart = updatedCart.filter((item) => item.quantity > 0);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const userResponse = await axios.get(`${process.env.BACKEND_URL}/api/users/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = userResponse.data;

      const orderItems = cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price * item.quantity
      }));

      const orderData = {
        user: userData,
        orderItems: orderItems,
        totalAmount: total,
        paymentStatus: "PENDING"
      };

      console.log("Sending order:", orderData);

      const response = await axios.post(`${process.env.BACKEND_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Order placed successfully:", response.data);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
    nav("/user/placeOrder");
  };


  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="cart-list">
            {cart.map((x) => (
              <div className="cart-item" key={x.id}>
                <div className="cart-item-left">
                  <h2 className="product-name">{x.product.name}</h2>
                  <p className="product-description">{x.product.description}</p>
                </div>

                <div className="cart-item-right">
                  <div className="cart-info">
                    <label>Price:</label>
                    <span>₹ {x.product.price}</span>
                  </div>

                  <div className="cart-info">
                    <label>Category:</label>
                    <span>{x.product.category}</span>
                  </div>

                  <div className="cart-info quantity-control">
                    <label>Quantity:</label>
                    <div className="quantity-buttons">
                      <input
                        type="button"
                        value="-"
                        onClick={() => handleChange("-", x.id)}
                      />
                      <span className="quantity-value">{x.quantity}</span>
                      <input
                        type="button"
                        value="+"
                        onClick={() => handleChange("+", x.id)}
                        disabled={x.quantity >= x.product.stock}
                      />
                    </div>
                  </div>

                  <div className="cart-info">
                    <label>Stock:</label>
                    <span>{x.product.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <div className="cart-total">
            <h2>Total: ₹ {total.toFixed(2)}</h2>
            <input type="button" value="Place Order" onClick={handlePlaceOrder}></input>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
