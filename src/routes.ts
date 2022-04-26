import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreatedMessageController } from "./controllers/CreatedMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { GetProfileUserControllers } from "./controllers/GetProfileController";
import { ensureAuthentication } from "./middlewares/ensureAutheticated";


const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)

router
  .post('/messages', ensureAuthentication,new CreatedMessageController().handle)
  .get('/messages/lastThree', new GetLast3MessagesController().handle);

router.get('/profile',ensureAuthentication , new GetProfileUserControllers().handle);




export { router }