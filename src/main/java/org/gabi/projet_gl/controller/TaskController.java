package org.gabi.projet_gl.controller;

import org.gabi.projet_gl.model.Task;
import org.gabi.projet_gl.repo.TaskRepository;
import org.gabi.projet_gl.repo.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class TaskController {

  private final TaskRepository repository;

  public TaskController(TaskRepository repository) {
    this.repository = repository;
  }
  @GetMapping("/tasks")
  List<Task> all() {
    return repository.findAll();
  }

  @GetMapping("/tasks/{id}")
  Task one(@PathVariable Long id) {
    return repository.findById(id)
        .orElse(null);
  }
  @PostMapping("/tasks")
  Task newTask(@RequestBody Task newTask) {
    return repository.save(newTask);
  }
  @PutMapping("/tasks/{id}")
  Task replaceTask(@RequestBody Task newTask, @PathVariable Long id) {
    return repository.findById(id)
        .map(task -> {
          task.setTitle(newTask.getTitle());
          task.setDescription(newTask.getDescription());
          return repository.save(task);
        })
        .orElseGet(() -> {
          newTask.setId(id);
          return repository.save(newTask);
        });
  }
}
