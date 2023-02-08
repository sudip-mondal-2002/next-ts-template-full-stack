import prisma from "../../libs/prisma";
import {DatabaseConnectionError, NotFoundError} from "../../errors/api";
import jwt from "jsonwebtoken";
import {nodemailerTransporter} from "../../libs/nodemailer";
import bcrypt from "bcrypt";

export async function ResetPasswordActController(token: string, newPassword: string) {
    let user_id = (jwt.verify(token, process.env.JWT_SECRET!) as { id: any }).id
    newPassword = bcrypt.hashSync(newPassword.trim(), 10);
    let user
    try {
        user = await prisma.user.update({
            where: {
                id: user_id
            }, data: {
                password_hash: newPassword
            }
        })
    } catch (e) {
        throw new DatabaseConnectionError()
    }
    if (!user) throw new NotFoundError();
    await nodemailerTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset',
        html: `Hey ${user.name}, your password has been reset.`
    })
}