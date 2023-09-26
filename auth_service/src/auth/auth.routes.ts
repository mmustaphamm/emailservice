import {  Router } from "express"
import { UsersController } from "./auth.controller";
import { UserMiddlewares } from "../common/middlewares/middlewares";

const router = Router();

router.post('/getotp', UsersController.registerUser);
router.post("/verify", UserMiddlewares.VerifyToken, UsersController.verifyOtpByEmail);
router.put("/change-password", UserMiddlewares.VerifyToken, UsersController.changePassword)
router.post("/forgot-password", UsersController.forgotPassword)
router.post("/reset-password/:id/:token", UsersController.resetPassword)
//router.post("")

export default router;




























































































// router.post('/register', async (req: Request, res: Response) => {
//     const { address, last_name, first_name, country, other_names} = req.body;
  
//     // Check if user with the same email or phone exists
//    const userRepository = AppDataSource.getRepository(Users);
//    // const existingEmail = await userRepository.findOne({ where: {  } });
  
//    // if (existingEmail) {
//   //    return res.status(400).json({ message: 'User already exists' });
//    // }
  
//     // Hash the password
//    // const hashP = await Utils.hashFunction(password)
  
//     // Create and save the user
//     const newEmail = new Users();
//     newEmail.address = address;
//     newEmail.first_name = first_name
//     newEmail.country = country
//     newEmail.last_name = last_name
//     newEmail.other_names = other_names

  
//     await userRepository.save(newEmail);
  
//     return res.status(201).json({ message: 'User registered successfully' });
 // });

