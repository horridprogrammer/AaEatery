import axios from "axios";
import { useEffect, useState } from "react";
import "../../../css/OrderPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/orders/user/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter only PAID orders
        const paidOrders = response.data.filter(
          (order) => order.paymentStatus === "PAID"
        );
        setOrders(paidOrders);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No paid orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order ID: {order.id}</h2>
              <p>
                <strong>Delivery Address:</strong> {order.deliveryAddress}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <h3>Items:</h3>
              <ul>
                {order.orderItems?.map((item) => (
                  <li key={item.id}>
                    {item.product?.name} x {item.quantity} = ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
