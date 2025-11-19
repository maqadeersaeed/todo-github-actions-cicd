package com.qadeersaeed.todoapp.dto;

import com.qadeersaeed.todoapp.task.TaskEntity;
import com.qadeersaeed.todoapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Optional<TaskEntity> findByIdAndUser(UUID id, UserEntity user);

    List<TaskEntity> findByUserOrderByCreatedAtDesc(UserEntity user);

}
