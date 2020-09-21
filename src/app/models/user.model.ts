export class User{
    public id: number;
    public name:string;
    public email:string;
    public phone:number;
    public location:string;

    constructor(id:number,name:string,email:string,phone:number,location:string){
        this.id = id
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.location = location;
    }
}