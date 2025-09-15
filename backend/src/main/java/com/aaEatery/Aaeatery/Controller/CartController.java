package com.aaEatery.Aaeatery.Controller;

import com.aaEatery.Aaeatery.Entity.CartItem;
import com.aaEatery.Aaeatery.Service.CartItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartItemService cartItemService;

    public CartController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartItemService.addCartItem(cartItem);
    }

    @GetMapping("/user/{userId}")
    public List<CartItem> getUserCart(@PathVariable Long userId) {
        return cartItemService.getCartItemsByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void removeCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
    }
}
