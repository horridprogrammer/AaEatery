package com.aaEatery.Aaeatery.Controller;

import com.aaEatery.Aaeatery.Entity.CartItem;
import com.aaEatery.Aaeatery.Entity.Product;
import com.aaEatery.Aaeatery.Entity.User;
import com.aaEatery.Aaeatery.Service.CartItemService;
import com.aaEatery.Aaeatery.Service.ProductService;
import com.aaEatery.Aaeatery.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userser;

    @Autowired
    private ProductService proser;

    public CartController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PutMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartItemService.addCartItem(cartItem);
    }

    @DeleteMapping("/clear/{email}")
    public void clearCart(@PathVariable String email) {
        cartItemService.clearCartByUser(email);
    }


    @PostMapping
    public CartItem updateToCart(@RequestParam Long proId, @RequestParam String email){
        User user = userser.getUserByEmail(email);
        Product product = proser.getProductById(proId);
        CartItem newCartItem = new CartItem();

        newCartItem.setUser(user);
        newCartItem.setProduct(product);
        newCartItem.setQuantity(1);
        cartItemService.addCartItem(newCartItem);

        return cartItemService.addCartItem(newCartItem);
    }

    @GetMapping("/user/{email}")
    public List<CartItem> getUserCartByEmail(@PathVariable String email){
        return cartItemService.getCartItemsByEmail(email);
    }

    @DeleteMapping("/{id}")
    public void removeCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
    }
}
