import {User} from '../../user/user';
import {Task} from '../../task/task';


export class Project{

  private _project_id : string = "";
  private _nameP : string = "New Project";
  private _doneP : boolean = false;
  private _startDateP : string = "00/00/0000";
  private _deadLineP : string = "00/00/0000";
  private _participants : User[] = [];
  private _tasks : Task[] = [];
  private _color : string = "#" + Math.floor(Math.random()*16777215).toString(16);

  constructor(){

  }

  get project_id() : string{
    return this._project_id;
  }
  set project_id(project_id : string){
    this._project_id = project_id;
  }

  get nameP() : string{
    return this._nameP;
  }
  set nameP(name : string){
    this._nameP = name;
  }

  get doneP() : boolean{
    return this._doneP;
  }
  set doneP(done : boolean){
    this._doneP = done;
  }

  get startDateP() : string{
    return this._startDateP;
  }
  set startDateP(startDate : string){
    this._startDateP = startDate;
  }

  get deadLineP() : string{
    return this._deadLineP;
  }
  set deadLineP(deadLine : string){
    this._deadLineP = deadLine;
  }

  get participants() : User[]{
    return this._participants;
  }
  set participants(participants : User[]){
    this._participants = participants;
  }

  get tasks() : Task[]{
    return this._tasks;
  }
  set tasks(tasks : Task[]){
    this._tasks = tasks;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
}
