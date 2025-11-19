package com.qadeersaeed.todoapp.user;


import com.qadeersaeed.todoapp.config.JWTHelper;
import com.qadeersaeed.todoapp.dto.LoginRequest;
import com.qadeersaeed.todoapp.dto.RegisterRequest;
import com.qadeersaeed.todoapp.dto.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JWTHelper jwt;

    /**
     * REGISTER
     */
    public void register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        UserEntity user = new UserEntity();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));

        userRepo.save(user);
    }

    /**
     * LOGIN -> Return JWT Token
     */
    public String login(LoginRequest req) {
        UserEntity user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        boolean valid = encoder.matches(req.getPassword(), user.getPassword());

        if (!valid) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwt.generateToken(user.getEmail());
    }

    /**
     * REQUIRED BY SPRING SECURITY
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}
