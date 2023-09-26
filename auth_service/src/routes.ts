import { Router} from "express";
import usersRoute from "./auth/auth.routes"
import emailRoutes from "./email/email.route"

const router = Router();


router.use("/api", usersRoute);
router.use("/api", emailRoutes)

export default router