package org.gabi.projet_gl;

import jakarta.annotation.PostConstruct;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.service.ProjectService;
import org.gabi.projet_gl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.time.LocalDate;

//à venir. laisser le frontend dans resources, static
@SpringBootApplication
public class ProjetGlApplication {
	@Autowired
	private UserService userService;
  @Autowired
  private ProjectService projectService;

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(ProjetGlApplication.class, args);
	}

	@PostConstruct
	public void init() {
		AppUser usr = new AppUser("your_username", "your_email@gigi.com");
		//ceci marche. Le userService marche correctement
		userService.saveUser(usr);


		AppUser usr2 = new AppUser("snoop", "snoop_dogg@shkex.fum");
		userService.saveUser(usr2);
		Project pj = new Project(1L, "test", "test", false, LocalDate.now(), LocalDate.now());
		projectService.saveProject(pj);
		userService.addProject(usr2.getUser_id(), pj.getProject_id());
		System.out.println(pj.getParticipants());
		System.out.println(userService.getUserById(2L).getName());
	}

}