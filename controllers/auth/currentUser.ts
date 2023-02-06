import jwt from "jsonwebtoken";
import {UserResponseDTO} from "../../dto/User/UserResponse";

export function CurrentUserController(token: string) {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as UserResponseDTO;
    const userResponseDTO: UserResponseDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
    return userResponseDTO;
}