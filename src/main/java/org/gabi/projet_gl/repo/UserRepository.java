package org.gabi.projet_gl.repo;

import org.gabi.projet_gl.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long> {

}
