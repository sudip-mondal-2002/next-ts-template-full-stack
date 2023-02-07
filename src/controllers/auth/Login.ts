import prisma from "../../libs/prisma";
import {UserRequestDTO} from "../../dto/User/UserRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserResponseDTO} from "../../dto/User/UserResponse";
import {DatabaseConnectionError, UnauthorizedError} from "../../errors/api";

export async function LoginController(userDTO: UserRequestDTO) {
    let user
    try{
        user= await prisma.user.findUnique({
            where: {
                email: userDTO.email
            }
        })
    } catch (e) {
        throw new DatabaseConnectionError()
    }

    if (!user) {
        throw new UnauthorizedError()
    }
    const passwordMatch = bcrypt.compareSync(userDTO.password, user.password_hash);
    if (!passwordMatch) {
        throw new UnauthorizedError()
    }
    const userResponseDTO: UserResponseDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
    const token = jwt.sign(userResponseDTO, process.env.JWT_SECRET!, {
        expiresIn: 86400
    })
    return {
        user: userResponseDTO,
        token
    }
}