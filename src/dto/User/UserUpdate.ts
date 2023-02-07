import {IsEmail} from 'class-validator';

export class UserUpdateDTO {
    @IsEmail()
    email?: string;

    name?: string;

    constructor(email?: string, name?: string) {
        this.email = email;
        this.name = name;
    }
}
