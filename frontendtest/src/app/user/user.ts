export class User {
  private user_id : string;
  private name : string;
  private email : string;

  constructor(user_id : string, name : string, email : string) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
  }

  getUserId() : string{
    return this.user_id;
  }
  setUserId(user_id : string) : void{
    this.user_id = user_id;
  }

  getUName() : string{
    return this.name;
  }
  setUName(name : string) : void{
    this.name = name;
  }

  getEmail() : string{
    return this.email;
  }
  setEmail(email : string) : void{
    this.email = email;
  }
}
