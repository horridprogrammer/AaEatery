import axios from "axios";
import { useState } from "react";

const OrderPlacement = () => {
  const [add, setAdd] = useState("");

  const PlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      // Fetch orders for the user
      const data = await axios.get(`http://localhost:8080/api/orders/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = data.data;

      // Check if the user has any orders
      if (!orders || orders.length === 0) {
        console.log("No orders found for this user.");
        return;
      }

      // Get the latest order (assuming last element is the latest)
      const latestOrder = orders[orders.length - 1];

      // Update order delivery address (plain text body)
      await axios.put(
        `http://localhost:8080/api/orders/${latestOrder.id}`,
        {
            deliveryAddress: add,
            paymentStatus: "PAID"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear the cart after placing the order
      const del = await axios.delete(`http://localhost:8080/api/cart/clear/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cart cleared:", del.data);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Order Placement</h1>
      <label>Address: </label>
      <input
        type="text"
        value={add}
        onChange={(e) => setAdd(e.target.value)}
        placeholder="Enter your delivery address"
      />
      <input
        type="button"
        value="Pay"
        onClick={PlaceOrder}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

export default OrderPlacement;
