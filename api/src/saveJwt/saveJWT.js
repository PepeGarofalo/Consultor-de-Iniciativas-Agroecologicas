 
 export class LogedUser {
    constructor(access_token) {
      if (LogedUser.instance) {
        return LogedUser.instance;
      }
  
      this._access_token = access_token;
      LogedUser.instance = this;
    }
  
    get access_token() {
      return this._access_token;
    }
  
    // Métodos de la clase
  }