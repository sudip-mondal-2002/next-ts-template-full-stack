import prisma from "../../lib/prisma";
import {UserRequestDTO} from "../../dto/User/UserRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserResponseDTO} from "../../dto/User/UserResponse";

export async function SignupController(userDTO: UserRequestDTO) {
    const passwordHash = bcrypt.hashSync(userDTO.password, 10);
    let user = await prisma.user.create({
        data: {
            name: userDTO.name + "",
            email: userDTO.email,
            password_hash: passwordHash
        }
    });
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