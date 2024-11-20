package org.gabi.projet_gl.service;

import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.repo.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProjectService {
  private final ProjectRepository projectRepository;

  @Autowired
  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
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
}
