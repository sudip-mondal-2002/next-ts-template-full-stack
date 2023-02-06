import prisma from "../../lib/prisma";
import {UserRequestDTO} from "../../dto/User/UserRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserResponseDTO} from "../../dto/User/UserResponse";

export async function LoginController(userDTO: UserRequestDTO) {
    const user = await prisma.user.findUnique({
        where: {
            email: userDTO.email
        }
    })
    if (!user) {
        return {
            user: null,
            token: null
        };
    }
    const passwordMatch = bcrypt.compareSync(userDTO.password, user.password_hash);
    if (!passwordMatch) {
        return {
            user: null,
            token: null
        }
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