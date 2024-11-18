package org.gabi.projet_gl.model;

import org.springframework.stereotype.Component;

public class Task {

  private int id;
  private String title;
  private String description;
  private boolean done;

  public Task(int id, String title, String description, boolean done) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
  }
}
