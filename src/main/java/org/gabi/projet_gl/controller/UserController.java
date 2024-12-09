package org.gabi.projet_gl.controller;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.model.ProjectUserDTO;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.gabi.projet_gl.repo.UserRepository;
import java.util.List;

import org.gabi.projet_gl.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class UserController {

  private final UserRepository repository;
  private final ProjectRepository projectRepository;
  private final UserService userService;

  UserController(UserRepository repository, ProjectRepository projectRepository, UserService userService) {
    this.repository = repository;
    this.projectRepository = projectRepository;
    this.userService = userService;
  }
  // Aggregate root
  @GetMapping("/users")
  List<AppUser> all() {
    return repository.findAll();
  }
  @PostMapping(value = "/users")
  AppUser newUser(@RequestBody AppUser newUser) {
    return repository.save(newUser);
  }
  // Single item
  @GetMapping("/users/{id}")
  AppUser one(@PathVariable Long id) {
    return repository.findById(id)
        .orElse(null);
  }
  //todo: cet endpoint pourrait être (devrait être) ailleur mais il n'y a pas assez
  // de méthodes exterieures pour le justifier
  // méthode s'en servant du dto
  @PostMapping ("/add")
  public void setUserProject(@RequestBody ProjectUserDTO dto){
    userService.addProject(dto.getUser_id(), dto.getProject_id());
  }
  //méthode en passant les paramètres par path
  @PostMapping("/add/{idu}/{idp}")
  public void setUserProject(@PathVariable Long idu, @PathVariable Long idp){
    userService.addProject(idu, idp);
  }
  @PutMapping("/users/{id}")
  AppUser replaceUser(@RequestBody AppUser newUser, @PathVariable Long id) {

    return repository.findById(id)
        .map(user -> {
          user.setName(newUser.getName());
          user.setEmail(newUser.getEmail());
          return repository.save(user);
        })
        .orElseGet(() -> {
          return repository.save(newUser);
        });
  }

  @DeleteMapping("/users/{id}")
  void deleteUser(@PathVariable Long id) {
    repository.deleteById(id);
  }
}