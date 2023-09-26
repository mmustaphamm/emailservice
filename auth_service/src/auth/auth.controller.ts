import { Request, Response } from "express";
import { UsersService } from "./auth.service";
import { Utils } from "../common/utils/utils";
import { cache } from "../loader/database/redis";
import { AssertMessage } from "../common/rabbitMq/rabbbitMqPublisher";
import { TokenBlacklist } from "./token/token.entity";
import { AppDataSource } from "../data-source";



export class UsersController {
    static async registerUser(req:Request, res:Response) {

        const {email, phone} = req.body
        try {
            console.log('inside the controller')
            await UsersService.checkEmailExist(email)
            const otp = await Utils.generateOtp();
            // const hashedOtp = await Utils.hashFunction(otp)
            const payload = {email, otp}
            await AssertMessage.assertMsg(payload)
            await Utils.generateToken({email})
            await cache.set(email, otp, 300)
          return res.status(200).json({ message: 'Message sent and cached successfully', data: otp });
        } catch(e){
          console.error('Cannot process Registration:', e);
          return res.status(500).json({ message: 'Internal Server Error', error: e })
        }
    }

    static async verifyOtpByEmail(req: Request, res: Response) {
      try {
          const{  userProvidedOTP } = req.body
          const email = (req as any).user.email
          console.log(email)
          const storedOTP = await cache.get(email)
           if (!storedOTP || storedOTP !== userProvidedOTP) {
            return res.status(400).json({ message: 'Invalid OTP' });
          }
          await cache.delete(email);
          return res.status(200).json({ message: 'OTP verified' });
      } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error }) 
      }
    }

    static async changePassword(req:Request, res:Response) {
      try {
        const userId = (req as any).user.id
        const { oldPassword, newPassword, confirmPassword } = req.body;

        await UsersService.changePassword(userId, oldPassword, newPassword, confirmPassword)
        const tokenToInvalidate = req.headers.authorization?.split(' ')[1]
       
         if (tokenToInvalidate) {
           const revokedToken = new TokenBlacklist()
           revokedToken.token = tokenToInvalidate
           const revokedTokenrepo = AppDataSource.getRepository(TokenBlacklist)
           revokedTokenrepo.save(revokedToken)
         }
        return res.status(200).json({ message: 'Password changed successfully'})
      } catch(e){
        console.log("error from confirm password", e)
        return res.status(500).json({ message: 'Internal Server Error', error: e })
      }
    } 

    static async forgotPassword(req:Request, res:Response) {
      try {
        const {email} = req.body
        await UsersService.forgotPassword(email)
        return res.status(200).json({ message: 'A password reset link has been sent to your mail'}) 
      } catch (error) {
        console.log('forgot error password', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error })  
      }
    }

    static async resetPassword(req:Request, res:Response) {
      try {
        const {id, token} = req.params
        const {password, confirmPassword} = req.body
        await UsersService.resetPassword(Number(id), token, password, confirmPassword)
        res.status(200).json({message: "Your password has been reset"})
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `Internal server error ${error}` });
        
      }
    }
    
}