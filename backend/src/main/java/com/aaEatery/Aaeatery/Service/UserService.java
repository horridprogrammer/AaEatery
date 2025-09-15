package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.User;
import com.aaEatery.Aaeatery.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userrepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userrepo) {
        this.userrepo = userrepo;
    }

    public User saveUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);
    }

    public List<User> getAllUsers(){
        return userrepo.findAll();
    }

    public User fetUserById(Long id){
        return userrepo.findById(id).orElse(null);
    }

    public void deleteUser(Long id){
        userrepo.deleteById(id);
    }
}
