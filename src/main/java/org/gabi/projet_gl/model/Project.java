package org.gabi.projet_gl.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long project_id;
  //code pour l'association many to many
  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
      name = "project_participants",
      joinColumns = @JoinColumn(name = "project_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  @JsonBackReference
  private Set<AppUser> participants;
  @JsonIgnore
  @OneToMany(mappedBy = "project")
  private Set<Task> tasks;
  private String name;
  private String description;
  private boolean done;
  public LocalDate getStartDate() {
    return startDate;
  }
  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }
  public LocalDate getDeadline() {
    return deadline;
  }
  public void setDeadline(LocalDate deadline) {
    this.deadline = deadline;
  }
  private LocalDate startDate;
  private LocalDate deadline;
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
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
  public Set<Task> getTasks() {
    return tasks;
  }
  public void setTasks(Set<Task> tasks) {
    this.tasks = tasks;
  }



  public Project(Long project_id,
                 String name,
                 String description,
                 boolean done,
                 LocalDate startDate,
                 LocalDate deadline)
  {
    this.project_id = project_id;
    this.name = name;
    this.description = description;
    this.done = done;
    this.startDate = startDate;
    this.deadline = deadline;
    this.participants = new HashSet<>();
    this.tasks = new HashSet<>();
  }

  public Project() {}
  public void setId(Long project_id) {
    this.project_id = project_id;
  }

  public Long getProject_id() {
    return this.project_id;
  }
  public Set<AppUser> getParticipants() {
    return participants;
  }

}
