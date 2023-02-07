import prisma from "../../libs/prisma";
import {DatabaseConnectionError, NotFoundError} from "../../errors/api";
import jwt from "jsonwebtoken";
import {nodemailerTransporter} from "../../libs/nodemailer";

export async function ResetPasswordRequestController(email: string) {
    let user
    try {
        user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (e) {
        throw new DatabaseConnectionError()
    }
    if (!user) throw new NotFoundError();
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
    const url = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const message = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Password',
        html: `Hey ${user.name}, click <a href="${url}">here</a> to reset your password.`
    }
    console.log(message);
    await nodemailerTransporter.sendMail(message);
}