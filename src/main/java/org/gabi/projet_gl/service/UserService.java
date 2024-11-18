package org.gabi.projet_gl.service;

import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public AppUser saveUser(AppUser appUser) {
    return userRepository.save(appUser);
  }
  public List<AppUser> getAllUser(Long id) {
    return userRepository.findAll();
  }
  public AppUser getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }
}