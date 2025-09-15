package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.CartItem;
import com.aaEatery.Aaeatery.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartitemrepo;

    public CartItemService(CartItemRepository cartitemrepo) {
        this.cartitemrepo = cartitemrepo;
    }

    public CartItem addCartItem(CartItem cartItem) {
        return cartitemrepo.save(cartItem);
    }

    public List<CartItem> getCartItemsByUser(Long userId) {
        return cartitemrepo.findByUserId(userId);
    }

    public void deleteCartItem(Long id) {
        cartitemrepo.deleteById(id);
    }

}
