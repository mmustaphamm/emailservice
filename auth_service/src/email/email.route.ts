import { Router } from "express"
import { EmailController } from "./email.controller";

const router = Router();

router.post('/send-email', EmailController.SendEmail);


export default router;