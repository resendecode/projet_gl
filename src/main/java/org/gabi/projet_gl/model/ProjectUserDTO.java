package org.gabi.projet_gl.model;
// objet de transfert nessessaire pour l'ajout d'un participant
public class ProjectUserDTO {
  private Long project_id;
  private Long user_id;
  public Long getProject_id() {
    return project_id;
  }
  public Long getUser_id() {
    return user_id;
  }
}
