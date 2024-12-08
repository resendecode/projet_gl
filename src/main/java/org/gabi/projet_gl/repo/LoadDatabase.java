package org.gabi.projet_gl.repo;

import org.gabi.projet_gl.model.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.gabi.projet_gl.model.AppUser;
import java.util.logging.Logger;

@Configuration
public class LoadDatabase {
  private static final Logger log = Logger.getLogger(LoadDatabase.class.getName());
  @Bean
  CommandLineRunner initDatabase(UserRepository repository) {
    return args -> {
      log.info("Preloading " + repository.save(new AppUser("Bilbo Baggins", "bibag@univ-pau.fr", "bilbopass", UserRole.PROJECT_LEADER)));
      log.info("Preloading " + repository.save(new AppUser("Frodo Baggins", "frogab@univ-pau.fr", "frodopass", UserRole.USER)));
    };
  }
}
