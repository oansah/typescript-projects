import { injectable, inject } from "inversify";



@injectable()
export class UserController {
    constructor(){}

     public getUser(){
       return {
        firstName: "John",
        lastName: "Clement",
        email: "test@abc.com"
       } 
     }
    
} 