package com.qadeersaeed.todoapp.task;

import com.qadeersaeed.todoapp.dto.TaskRepository;
import com.qadeersaeed.todoapp.dto.TaskRequest;
import com.qadeersaeed.todoapp.exception.TaskNotFoundException;
import com.qadeersaeed.todoapp.user.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repo;

    /**
     * GET ALL TASKS FOR LOGGED-IN USER
     */
    public List<TaskEntity> getTasks(UserEntity user) {
        return repo.findByUserOrderByCreatedAtDesc(user);
    }

    /**
     * CREATE TASK FOR USER
     */
    public TaskEntity create(TaskRequest req, UserEntity user) {
        TaskEntity task = new TaskEntity();
        task.setTitle(req.getTitle());
        task.setCompleted(false);
        task.setUser(user);
        return repo.save(task);
    }

    /**
     * TOGGLE USER'S TASK (SECURE)
     */
    public TaskEntity toggle(UUID id, UserEntity user) {

        TaskEntity task = repo.findByIdAndUser(id, user)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        task.setCompleted(!task.isCompleted());
        return repo.save(task);
    }

    /**
     * DELETE USER'S TASK (SECURE)
     */
    public void delete(UUID id, UserEntity user) {
        TaskEntity task = repo.findByIdAndUser(id, user)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        repo.delete(task);
    }
}
