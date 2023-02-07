import {NextApiRequest, NextApiResponse} from "next";
import {CurrentUserController} from "../../../controllers/auth/CurrentUser";
import {NotFoundError, UnauthorizedError} from "../../../errors/api";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpStatus} from "../../../enums";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies?.token;
    if (!token) throw new UnauthorizedError();
    let user;
    try {
        user = await CurrentUserController(token);
    } catch (e) {
        throw new UnauthorizedError();
    }
    if (!user) throw new NotFoundError();
    return res.status(HttpStatus.OK).json(user);
}

export default apiHandler({
    GET: handleGetRequest
})