package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.OrderItem;
import com.aaEatery.Aaeatery.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderitemrepo;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderitemrepo = orderItemRepository;
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderitemrepo.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderitemrepo.findAll();
    }

    public OrderItem getOrderItemById(Long id) {
        return orderitemrepo.findById(id).orElse(null);
    }

    public void deleteOrderItem(Long id) {
        orderitemrepo.deleteById(id);
    }

    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderitemrepo.findByOrderId(orderId);
    }
}
