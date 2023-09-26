import { Router, Request, Response } from "express";
import emailrouter from "./email/email.routes";


const router = Router();

router.use("/api", emailrouter);

export default router
