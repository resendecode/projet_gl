import {UserRole} from "./UserRole";
export class User {

  private _user_id : string = "";
  private _name : string = "";
  private _email : string = "";
  private _password : string = "";
  private _role : UserRole = 0;

  constructor() {
  }

  get user_id() : string{
    return this.user_id;
  }
  set user_id(user_id : string){
    this._user_id = user_id;
  }

  get name() : string{
    return this._name;
  }
  setUName(name : string){
    this._name = name;
  }

  get email() : string{
    return this._email;
  }
  set email(email : string){
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): UserRole {
    return this._role;
  }

  set role(value: UserRole) {
    this._role = value;
  }
}
