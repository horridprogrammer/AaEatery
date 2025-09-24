package com.aaEatery.Aaeatery.Controller;

import com.aaEatery.Aaeatery.Entity.Order;
import com.aaEatery.Aaeatery.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Map<String, Object> body){
        Order existing = orderService.getOrderById(id);
        if(existing == null){
            return null;
        }
        if(body.containsKey("deliveryAddress")){
            existing.setDeliveryAddress((String) body.get("deliveryAddress"));
        }
        if(body.containsKey("paymentStatus")){
            existing.setPaymentStatus((String) body.get("paymentStatus"));
        }
        return orderService.saveOrder(existing);
    }

    @GetMapping("/user/{email}")
    public List<Order> getUserOrders(@PathVariable String email) {
        return orderService.getOrdersByUserEmail(email);
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
