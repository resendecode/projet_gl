package org.gabi.projet_gl.controller;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.repo.UserRepository;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class UserController {

  private final UserRepository repository;
  UserController(UserRepository repository) {
    this.repository = repository;
  }
  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/users")
  List<AppUser> all() {
    return repository.findAll();
  }
  // end::get-aggregate-root[]

  @PostMapping("/users")
  AppUser newUser(@RequestBody AppUser newUser) {
    return repository.save(newUser);
  }
  // Single item
  @GetMapping("/users/{id}")
  AppUser one(@PathVariable Long id) {
    return repository.findById(id)
        .orElse(null);
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