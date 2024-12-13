package org.gabi.projet_gl.service;

import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.model.UserRole;
import org.gabi.projet_gl.repo.UserRepository;
import org.h2.engine.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTest {


  @Test
  void saveUser() {
    UserService userService = mock(UserService.class);
    UserRepository userRepository = mock(UserRepository.class);
    // Arrange
    AppUser user = new AppUser("Bilbo Bro", "bibag@univ-pau.fr", "bilbopass", UserRole.PROJECT_LEADER);
    when(userRepository.findById(user.getUser_id())).thenReturn(Optional.of(user));

    // Act
    userService.saveUser(user);
    // Assert
    AppUser savedUser = userRepository.findById(user.getUser_id()).orElse(null);
    assertNotNull(savedUser);
  }

  @Test
  void addProject() {
    UserService userService = mock(UserService.class);
    UserRepository userRepository = mock(UserRepository.class);
    ProjectService projectService = mock(ProjectService.class);
    // Arrange
    AppUser user = new AppUser("Bilbo Bro", "bibag@univ-pau.fr", "bilbopass", UserRole.PROJECT_LEADER);
    Project pj = new Project( "Sacré projet", "", false, LocalDate.now(), LocalDate.now());
    when(userRepository.findById(user.getUser_id())).thenReturn(Optional.of(user));
    when(userService.addProject(user.getUser_id(), pj.getProject_id())).thenReturn(user);

    // Act
    projectService.saveProject(pj);
    userService.saveUser(user);
    AppUser savedUser = userService.addProject(user.getUser_id(), pj.getProject_id());

    // Assert
    assertNotNull(savedUser);
  }
}