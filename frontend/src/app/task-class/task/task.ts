export class Task{
  private _task_id : string = "";
  private _title : string = "";
  private _description : string = "";
  private _done : boolean = false;

  constructor() {
  }

  get task_id() : string{
    return this._task_id;
  }
  set task_id(task_id : string){
    this._task_id = task_id;
  }

  get title() : string{
    return this._title;
  }
  set title(title : string){
    this._title = title;
  }

  get description() : string{
    return this._description;
  }
  set description(description : string){
    this._description = description;
  }

  get done() : boolean{
    return this._done;
  }
  set done(done : boolean){
    this._done = done;
  }
}
