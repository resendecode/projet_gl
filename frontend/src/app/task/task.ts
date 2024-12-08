export class Task{
  private _task_id : string;
  private _title : string;
  private _description : string;
  private _startDate : string;
  private _endDate : string;
  private _done : boolean;

  constructor(task_id : string,
              title : string,
              description : string,
              startDate : string,
              endDate : string,
              done : boolean) {
    this._task_id = task_id;
    this._title = title;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._done = done;
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

  get startDate() : string{
    return this._startDate;
  }
  set startDate(startDate : string){
    this._startDate = startDate;
  }

  get endDate() : string{
    return this._endDate;
  }
  set endDate(endDate : string){
    this._endDate = endDate;
  }

  get done() : boolean{
    return this._done;
  }
  set done(done : boolean){
    this._done = done;
  }
}
