package org.gabi.projet_gl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class ProjetGlApplication {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(ProjetGlApplication.class, args);
	}
}