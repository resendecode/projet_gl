export class User {
  private _user_id : string;
  private _name : string;
  private _email : string;

  constructor(user_id : string, name : string, email : string) {
    this._user_id = user_id;
    this._name = name;
    this._email = email;
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
}
