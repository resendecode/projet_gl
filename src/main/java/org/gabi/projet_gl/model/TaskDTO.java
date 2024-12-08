package org.gabi.projet_gl.model;

public class TaskDTO {
  private String title;
  private String description;
  private boolean done;
  private Long resp_id;
  private Long project_id;

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public boolean isDone() {
    return done;
  }

  public Long getResp_id() {
    return resp_id;
  }

  public Long getProject_id() {
    return project_id;
  }
}
