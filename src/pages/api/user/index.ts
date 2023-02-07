import {NextApiRequest, NextApiResponse} from "next";
import {CurrentUserController} from "../../../controllers/user/CurrentUser";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../../../errors/api";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpHeaders, HttpStatus} from "../../../enums";
import {UserUpdateDTO} from "../../../dto/User/UserUpdate";
import {UpdateUserController} from "../../../controllers/user/Update";

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

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies?.token || (req.headers[HttpHeaders.AUTHORIZATION] as string);
    if (!token) throw new UnauthorizedError();
    const updatedDetails = (req.body as UserUpdateDTO) || undefined;
    if (!updatedDetails) throw new BadRequestError()
    await UpdateUserController(updatedDetails, token);
    return res.status(HttpStatus.NO_CONTENT).end();
}

export default apiHandler({
    GET: handleGetRequest,
    PUT: handlePutRequest
})