import {User} from '../../user-class/user/user';
import {Task} from '../../task-class/task/task';


export class Project{
  private _project_id : string = "";
  private _name : string = "New Project";
  private _done : boolean = false;
  private _startDate : Date = new Date("0000-00-00");
  private _deadline : Date = new Date("0000-00-00");
  private _description : string = "";
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

  get name() : string{
    return this._name;
  }
  set name(name : string){
    this._name = name;
  }

  get done() : boolean{
    return this._done;
  }
  set done(done : boolean){
    this._done = done;
  }

  get startDate() : Date{
    return this._startDate;
  }
  set startDate(startDate : Date){
    this._startDate = startDate;
  }

  get deadline() : Date{
    return this._deadline;
  }
  set deadline(deadLine : Date){
    this._deadline = deadLine;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
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
