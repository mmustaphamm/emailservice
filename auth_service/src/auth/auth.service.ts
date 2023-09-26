import { Users } from "./users.entity";
import { usersValidator, ResetPasswordValidator, forgotPasswordValidator } from "../validators/validators";
import { UsersLogin } from "./interface/users.interface";
import { Exception } from "./interface/users.interface";
import { AppDataSource } from "../data-source";
import { Utils } from "../common/utils/utils";
import { AssertMessage } from "../common/rabbitMq/rabbbitMqPublisher";


export class UsersService {

    static async checkEmailExist(details: UsersLogin) {
      const { error, value } = usersValidator(details);
      if (error) throw new Exception(400, error.details[0].message)

      const {email}  = value
      const usersRepo = AppDataSource.getRepository(Users)
      const existingUser = await usersRepo.findOne({where: {email}})
      if (existingUser) {
        throw new Exception(400, "Email already exists");
      }
      return;
  }

    static async getUserByEmail(email:string) {
      try {  
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
          throw Error('Email does not exist')
         }
         return user;
      } catch (error) {
        throw new Exception(400, "Error fetching user by email");
      }
    }

    static async getUserById(id: number) {
      try {  
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({ where: { id} });
        if (!user) {
          throw Error('User not found')
         }
         return user;
      } catch (error) {
        throw new Exception(400, "Error fetching user by ID");
      }
    }

    static async updateUser(id: number, update ) {
      const userRepository = AppDataSource.getRepository(Users);
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
      return null;
     }
     await userRepository.update({ id }, { password: update })
     return user;
    }

    static async changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string) {

      try { 
        const {error, value} = ResetPasswordValidator({oldPassword ,newPassword, confirmPassword})
        if (error) throw new Exception(400, error.details[0].message)

        const user = await UsersService.getUserById(userId)
        const isPasswordValid = await Utils.compareHash(oldPassword, user.password)
        if (!isPasswordValid) {
        throw new Exception(400, 'Invalid old password');
       }
        if (value.newPassword !== value.confirmPassword) throw new Exception(400, "New password and confirm password do not match");
        

        const hashedPassword = await Utils.hashFunction(value.newPassword)
        await UsersService.updateUser(user.id, hashedPassword);
       // await AssertMessage.assertMsg()
        return "Password updated successfully";
      } catch(e) {
        console.log(e)
        throw new Exception(500, "Internal Server Error");
      }
    }

    static async forgotPassword(email:string) {

    try {
      const user = await UsersService.getUserByEmail(email)
      const payload = {id: user.id, email: user.email, userId: user.user_detail_id}

      const token = await Utils.generateToken(payload)
      const link = `http://localhost:5009/api/reset-password/${user.id}/${token}`
      await AssertMessage.assertMsg({email:user.email, otp:link})
      
      return {message:'Reset Link Sent'}
    } catch (error) {
      console.log('forgot error password', error)
      throw new Exception(400, "Error Sending ResetLink");
      
    }
   }

   static async resetPassword(id: number, token, password:string, confirmPassword: string) {
    try {
       const {error, value} = forgotPasswordValidator({password, confirmPassword})
       if (error) throw new Exception(400, error.details[0].message)

       const user = await UsersService.getUserById(id)
       const decode = await Utils.decodeToken(token)

       if (value.password !== value.confirmPassword) throw new Exception(400, "Password and confirm password do not match");

       //Make an api call

       return "Password reset successfully"  
    } catch (error) {
      console.log('érror', error)
      throw new Exception(400, `Error Resetting Password ${error}`);
    }
   }

}