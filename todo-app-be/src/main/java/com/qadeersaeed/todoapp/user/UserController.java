package com.qadeersaeed.todoapp.user;

import com.qadeersaeed.todoapp.dto.ApiResponse;
import com.qadeersaeed.todoapp.dto.LoginRequest;
import com.qadeersaeed.todoapp.dto.LoginResponse;
import com.qadeersaeed.todoapp.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * REGISTER NEW USER
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        userService.register(req);
        return ResponseEntity.ok().body(
                new ApiResponse("User registered successfully")
        );
    }

    /**
     * LOGIN AND RETURN JWT TOKEN
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        String token = userService.login(req);
        return ResponseEntity.ok(new LoginResponse(token));
    }
}