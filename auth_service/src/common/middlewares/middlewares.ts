import { IUser } from "../../auth/interface/users.interface";
import { AppDataSource } from "../../data-source";
import { TokenBlacklist } from "../../auth/token/token.entity";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserMiddlewares {
    static async VerifyToken(req:Request, res:Response, next:NextFunction){
    
        const secretKey = process.env.SECRET_KEY as string
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }

        const usersRepo = AppDataSource.getRepository(TokenBlacklist)
        const isTokenBlacklisted = await usersRepo.findOne({where: {token}})

        if (isTokenBlacklisted) {
          return res.status(401).json({ message: 'Authentication failed: Token has been revoked' });
        }

        try {
        const decodedToken = jwt.verify(token, secretKey) as IUser;
         req['user'] = decodedToken
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
    }
}