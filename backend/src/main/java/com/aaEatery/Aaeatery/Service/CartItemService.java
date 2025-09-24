package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.CartItem;
import com.aaEatery.Aaeatery.Entity.User;
import com.aaEatery.Aaeatery.Repository.CartItemRepository;
import com.aaEatery.Aaeatery.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartitemrepo;

    @Autowired
    private UserRepository userRepository;

    public CartItemService(CartItemRepository cartitemrepo) {
        this.cartitemrepo = cartitemrepo;
    }

    public CartItem findCartItemById(Long id){
        return cartitemrepo.findById(id).orElse(null);
    }

    public CartItem addCartItem(CartItem cartItem) {
        return cartitemrepo.save(cartItem);
    }

    public List<CartItem> getCartItemsByUser(Long userId) {
        return cartitemrepo.findByUserId(userId);
    }

    public void clearCartByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartitemrepo.deleteByUser(user);
    }


    public List<CartItem> getCartItemsByEmail(String email){
        List<CartItem> cartItems = cartitemrepo.findByUserEmail(email);
        Map<Long,CartItem> merged = new HashMap<>();
        for (CartItem item : cartItems){
            Long productId = item.getProduct().getId();
            if(merged.containsKey(productId)){
                CartItem existingItem = merged.get(productId);
                existingItem.setQuantity(existingItem.getQuantity()+item.getQuantity());
            }else{
                merged.put(productId,item);
            }
        }
        return new ArrayList<>(merged.values());
    }

    public void deleteCartItem(Long id) {
        cartitemrepo.deleteById(id);
    }

}
