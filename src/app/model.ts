import * as url from "url";

export interface User {
  firstName:string,
  lastName:string,
  password:string
  userId: number,
  username: string,
}

export interface ResponseAllUsers {
  users: User[]
}


export interface ResponseLogin {
  jwt: string
}





