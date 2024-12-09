package org.gabi.projet_gl.controller;

import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ProjectController {
  private final ProjectRepository repository;
  ProjectController(ProjectRepository repository) {
    this.repository = repository;
  }
  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/projects")
  List<Project> all() {
    return repository.findAll();
  }
  @GetMapping("/projects/{id}")
  Project one(@PathVariable Long id) {
    return repository.findById(id)
        .orElse(null);
  }
  @PostMapping("/projects")
  Project newProject(@RequestBody Project newProject) {
    return repository.save(newProject);
  }
  @PutMapping("/projects/{id}")
  Project replaceProject(@RequestBody Project newProject, @PathVariable Long id) {

    return repository.findById(id)
        .map(project -> {
          project.setName(newProject.getName());
          project.setDescription(newProject.getDescription());
          return repository.save(project);
        })
        .orElseGet(() -> {
          return repository.save(newProject);
        });
  }

  @DeleteMapping("/projects/{id}")
  void deleteProject(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
