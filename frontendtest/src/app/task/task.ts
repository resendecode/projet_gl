export class Task {
  private task_id : string;
  private title : string;
  private description : string;
  private startDate : string;
  private endDate : string;
  private done : boolean;

  constructor(task_id : string, title : string, description : string, startDate : string, endDate : string, done : boolean) {
    this.task_id = task_id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.done = done;
  }

  getTaskId() : string{
    return this.task_id;
  }
  setTaskId(task_id : string) : void{
    this.task_id = task_id;
  }

  getTitle() : string{
    return this.title;
  }
  setTitle(title : string) : void{
    this.title = title;
  }

  getDescr() : string{
    return this.description;
  }
  setDescr(description : string) : void{
    this.description = description;
  }

  getStartDate() : string{
    return this.startDate;
  }
  setStartDate(startDate : string) : void{
    this.startDate = startDate;
  }

  getEndDate() : string{
    return this.endDate;
  }
  setEndDate(endDate : string) : void{
    this.endDate = endDate;
  }

  getDone() : boolean{
    return this.done;
  }
  setDone(done : boolean) : void{
    this.done = done;
  }
}
