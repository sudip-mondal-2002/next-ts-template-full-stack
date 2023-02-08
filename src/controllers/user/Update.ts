import prisma from "../../libs/prisma";
import {CurrentUserController} from "./CurrentUser";
import {DatabaseConnectionError} from "../../errors/api";
import {UserUpdateDTO} from "../../dto/User/UserUpdate";

export async function UpdateUserController(updatedDetails: UserUpdateDTO, token: string) {
    const currentUser = CurrentUserController(token);
    try {
        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: updatedDetails.name || currentUser.name,
                email: updatedDetails.email || currentUser.email
            }
        })
    } catch (e) {
        throw new DatabaseConnectionError()
    }
}