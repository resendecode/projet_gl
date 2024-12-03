package org.gabi.projet_gl.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class AppUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long user_id;
  private String name;
  private String email;

  @OneToMany (mappedBy = "resp")
  @JsonIgnore
  private Set<Task> tasks;
  @ManyToMany(mappedBy = "participants")
  @JsonManagedReference
  private Set<Project> projects;
  // constructeur vide pour l'annotation entité
  protected AppUser() {}
  public AppUser(String name, String email) {
    this.name = name;
    this.email = email;
    this.projects = new HashSet<>();
    this.tasks = new HashSet<>();
  }
  @Override
  public String toString() {
    return "User{" +
            "id=" + user_id +
            ", name='" + name + '\'' +
            ", email='" + email + '\'' +
            '}';
  }

  public Long getUser_id() {
    return user_id;
  }
  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Task> getTasks() {
    return tasks;
  }

  public void setTasks(Set<Task> tasks) {
    this.tasks = tasks;
  }

  public Set<Project> getProjects() {
    return projects;
  }


}
