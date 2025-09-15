package com.aaEatery.Aaeatery.Repository;

import com.aaEatery.Aaeatery.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByUserId(Long userId);
}
