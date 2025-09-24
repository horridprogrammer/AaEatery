package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.Order;
import com.aaEatery.Aaeatery.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderrepo;

    public OrderService(OrderRepository orderrepo) {
        this.orderrepo = orderrepo;
    }

    public Order saveOrder(Order order) {
        return orderrepo.save(order);
    }

    public List<Order> getOrdersByUserEmail(String email){
        return orderrepo.findByUserEmail(email);
    }

    public Order updateOrder(Long id,String address){
        Order existing = orderrepo.findById(id).orElse(null);
        existing.setDeliveryAddress(address);
        return orderrepo.save(existing);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderrepo.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderrepo.findById(id).orElse(null);
    }
}
