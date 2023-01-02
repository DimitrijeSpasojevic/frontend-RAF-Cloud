import * as url from "url";

export interface User {
  firstName:string,
  lastName:string,
  password:string,
  roles: String[],
  userId: number,
  username: string
}

export interface UserM {
  userId: number,
  username: string
  firstName:string,
  lastName:string,
  password: string,
}

export interface Machine {
  id:number,
  name:string,
  status:string,
  createdBy:UserM,
  active: boolean,
  creationDate: string,
  isDeleted: boolean
}

export interface ResponseAllUsers {
  users: User[]
}

export interface ResponseAllMachines {
  machines: Machine[]
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





