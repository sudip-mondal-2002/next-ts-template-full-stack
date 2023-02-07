import jwt from "jsonwebtoken";
import {UserResponseDTO} from "../../dto/User/UserResponse";
import {UnauthorizedError} from "../../errors/api";

export function CurrentUserController(token: string) {
    let user
    try {
        user = jwt.verify(token, process.env.JWT_SECRET!) as UserResponseDTO;
    } catch (e) {
        throw new UnauthorizedError()
    }
    const userResponseDTO: UserResponseDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
    return userResponseDTO;
}