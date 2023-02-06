import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserRequestDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    name?: string;

    constructor(email: string, password: string, name?: string) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
