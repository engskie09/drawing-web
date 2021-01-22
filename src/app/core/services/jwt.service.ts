import { Injectable } from "@angular/core";

@Injectable()
export class JwtService {
  TOKEN_KEY = 'jwtToken'


  getToken(): string {
    return window.localStorage[this.TOKEN_KEY];
  }  
  
  saveToken(token: string) {
    window.localStorage.setItem(this.TOKEN_KEY, token)
  }

  removeToken() {
    window.localStorage.removeItem(this.TOKEN_KEY)
  }
}