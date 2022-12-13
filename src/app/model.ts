import * as url from "url";

export interface User {
  firstName:string,
  lastName:string,
  password:string,
  roles: String[],
  userId: number,
  username: string
}

export interface ResponseAllUsers {
  users: User[]
}


export interface ResponseLogin {
  jwt: string
}

export interface ResponseCreateUser {
  user: string
}

export interface CreateUser {
  username:string,
  firstName:string,
  lastName:string,
  password: string,
  roles: String[],
}





