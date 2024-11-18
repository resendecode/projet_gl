package org.gabi.projet_gl;

import jakarta.annotation.PostConstruct;
import org.gabi.projet_gl.model.AppUser;
import org.gabi.projet_gl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

//à venir. laisser le frontend dans resources, static
@SpringBootApplication
public class ProjetGlApplication {
	@Autowired
	private UserService userService;
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(ProjetGlApplication.class, args);
	}

	@PostConstruct
	public void init(){
		AppUser usr = new AppUser("your_username","your_email@gigi.com");
		//ceci marche. Le userService marche correctement
		userService.saveUser(usr);
	}
}