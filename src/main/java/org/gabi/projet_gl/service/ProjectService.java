package org.gabi.projet_gl.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.gabi.projet_gl.exceptions.ResourceNotFoundException;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.gabi.projet_gl.repo.UserRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {
  private final ProjectRepository projectRepository;
  private final UserRepository userRepository;

  @Autowired
  public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }

  public Project saveProject(Project project) {
    return projectRepository.save(project);
  }
  public List<Project> getAllProject(Long id) {
    return projectRepository.findAll();
  }
  public Project getProjectById(Long id) {
    return projectRepository.findById(id).orElse(null);
  }
  @Transactional
  public Project addParticipant(Long projectId, Long appUserId) {
    Project project = projectRepository.findById(projectId)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    AppUser appUser = userRepository.findById(appUserId)
        .orElseThrow(() -> new ResourceNotFoundException("AppUser not found"));

    project.getParticipants().add(appUser);
    appUser.getProjects().add(project);
    userRepository.save(appUser);
    projectRepository.save(project);
    return project;
  }
  @Transactional
  public Project removeParticipant(Long projectId, Long appUserId) {
    Project project = projectRepository.findById(projectId)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    AppUser appUser = userRepository.findById(appUserId)
        .orElseThrow(() -> new ResourceNotFoundException("AppUser not found"));
    project.getParticipants().remove(appUser);
    appUser.getProjects().remove(project);
    userRepository.save(appUser);
    projectRepository.save(project);
    return project;
  }
}
