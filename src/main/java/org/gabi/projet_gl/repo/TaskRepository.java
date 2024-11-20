package org.gabi.projet_gl.repo;

import org.gabi.projet_gl.model.Project;
import org.gabi.projet_gl.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository<Task, Long> {
}
