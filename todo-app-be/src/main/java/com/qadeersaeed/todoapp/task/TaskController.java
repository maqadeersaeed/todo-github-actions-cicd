package com.qadeersaeed.todoapp.task;

import com.qadeersaeed.todoapp.dto.ApiResponse;
import com.qadeersaeed.todoapp.dto.TaskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import com.qadeersaeed.todoapp.user.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    /**
     * GET ALL TASKS FOR LOGGED-IN USER
     */
    @GetMapping
    public ResponseEntity<List<TaskEntity>> getTasks(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(taskService.getTasks(user));
    }

    /**
     * CREATE TASK
     */
    @PostMapping
    public ResponseEntity<TaskEntity> createTask(
            @Valid @RequestBody TaskRequest req,
            @AuthenticationPrincipal UserEntity user
    ) {
        TaskEntity task = taskService.create(req, user);
        return ResponseEntity.ok(task);
    }

    /**
     * TOGGLE COMPLETED STATUS
     */
    @PutMapping("/{id}/toggle")
    public ResponseEntity<TaskEntity> toggle(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserEntity user
    ) {
        TaskEntity task = taskService.toggle(id, user);
        return ResponseEntity.ok(task);
    }

    /**
     * DELETE TASK
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserEntity user
    ) {
        taskService.delete(id, user);
        return ResponseEntity.ok(new ApiResponse("Task deleted successfully"));
    }
}
