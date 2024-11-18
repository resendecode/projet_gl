package org.gabi.projet_gl.model;

import java.time.LocalDate;
import java.util.List;

public class Project {

  private int id;
  private List<AppUser> participants;

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
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public List<AppUser> getParticipants() {
    return participants;
  }

  public void setParticipants(List<AppUser> participants) {
    this.participants = participants;
  }

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
  public void addUser(AppUser appUser) {
    this.participants.add(appUser);
  }
  public void removeUser(AppUser appUser) {
    this.participants.remove(appUser);
  }

  private String name;
  private String description;
  private boolean done;
  public Project(int id,
                 String name,
                 String description,
                 boolean done,
                 List<AppUser> participants,
                 LocalDate startDate,
                 LocalDate deadline)
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.done = done;
    this.participants = participants;
    this.startDate = startDate;
    this.deadline = deadline;
  }
}
