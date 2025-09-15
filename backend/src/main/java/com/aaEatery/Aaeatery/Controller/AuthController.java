package com.aaEatery.Aaeatery.Controller;

import com.aaEatery.Aaeatery.Entity.User;
import com.aaEatery.Aaeatery.JWT.AuthService;
import com.aaEatery.Aaeatery.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        return authService.register(user.getName(), user.getEmail(), user.getPassword(), user.getRole());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) throws Exception {
        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new Exception("User not found"));
        String token = authService.login(user.getEmail(), user.getPassword());
        return Map.of("token", token, "role", dbUser.getRole());
    }
}
