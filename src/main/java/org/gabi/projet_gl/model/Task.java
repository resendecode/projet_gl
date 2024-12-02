package org.gabi.projet_gl.model;
import jakarta.persistence.*;

@Entity
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String description;
  private boolean done;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private AppUser resp;
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }
  public boolean isDone() {
    return done;
  }
  public void setDone(boolean done) {
    this.done = done;
  }
  public AppUser getResp() {
    return resp;
  }
  public void setResp(AppUser resp) {
    this.resp = resp;
  }

  public Task(Long id, String title, String description, boolean done, AppUser usr) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
    this.resp = usr;
  }
  public Task(){};
}
