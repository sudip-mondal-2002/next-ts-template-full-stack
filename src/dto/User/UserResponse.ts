import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserResponseDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;

    constructor(id: number, name: string, email: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}