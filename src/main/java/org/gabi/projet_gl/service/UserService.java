package org.gabi.projet_gl.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.gabi.projet_gl.exceptions.ResourceNotFoundException;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.gabi.projet_gl.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;

  @Autowired
  public UserService(UserRepository userRepository, ProjectRepository projectRepository) {
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
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
  @Transactional
  public AppUser addProject(Long userId, Long projectId) {
    AppUser appUser = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("AppUser not found"));
    Project project = projectRepository.findById(projectId)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    appUser.getProjects().add(project);
    project.getParticipants().add(appUser);
    userRepository.save(appUser);
    projectRepository.save(project);
    return appUser;
  }


  @Transactional
  public AppUser removeProject(Long userId, Long projectId) {
    AppUser appUser = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("AppUser not found"));
    Project project = projectRepository.findById(projectId)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    appUser.getProjects().remove(project);
    project.getParticipants().remove(appUser);
    userRepository.save(appUser);
    projectRepository.save(project);
    return appUser;
  }
}