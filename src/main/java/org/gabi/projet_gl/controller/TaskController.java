package org.gabi.projet_gl.controller;

import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.model.Task;
import org.gabi.projet_gl.model.TaskDTO;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.gabi.projet_gl.repo.TaskRepository;
import org.gabi.projet_gl.repo.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class TaskController {

  private final TaskRepository repository;
  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;

  public TaskController(TaskRepository repository, UserRepository userRepository, ProjectRepository projectRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
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
  Task newTask(@RequestBody TaskDTO taskDTO) {
    Task newTask = new Task();
    newTask.setTitle(taskDTO.getTitle());
    newTask.setDescription(taskDTO.getDescription());
    newTask.setDone(taskDTO.isDone());

    AppUser resp = userRepository.findById(taskDTO.getResp_id()).orElse(null);
    Project pj = projectRepository.findById(taskDTO.getProject_id()).orElse(null);
    newTask.setResp(resp);
    newTask.setProject(pj);
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
