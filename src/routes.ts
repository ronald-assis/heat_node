import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreatedMessageController } from "./controllers/CreatedMessageController";
import { ensureAuthentication } from "./middlewares/ensureAutheticated";


const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)

router.post('/messages',
ensureAuthentication,
new CreatedMessageController().handle);


export { router }