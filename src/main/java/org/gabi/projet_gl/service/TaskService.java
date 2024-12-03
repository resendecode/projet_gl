package org.gabi.projet_gl.service;

import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.model.Task;
import org.gabi.projet_gl.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {
  private final TaskRepository taskRepository;
  @Autowired
  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }
  @Transactional
  public Task saveTask(Task task, AppUser user, Project project) {
    task.setResp(user);
    task.setProject(project);
    user.getTasks().add(task);
    project.getTasks().add(task);
    return taskRepository.save(task);
  }

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  public Task getTaskById(Long id) {
    return taskRepository.findById(id).orElse(null);
  }

  public void deleteTask(Long id) {
    taskRepository.deleteById(id);
  }
}