export class Task{

  private _id : string = "";
  private _title : string = "";
  private _description : string = "";
  private _project_id : string = "";
  private _done : boolean = false;
  private messages : string[] = [];

  constructor() {
  }

  get id() : string{
    return this._id;
  }
  set id(task_id : string){
    this._id = task_id;
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
  get project_id(): string {
    return this._project_id;
  }

  set project_id(value: string) {
    this._project_id = value;
  }
}
