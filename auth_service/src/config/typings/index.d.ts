import * as express from "express"


interface IUser {
    email: string;
}


declare global {
    namespace Express {
        interface Request {
            userData?: string
        }
    }
}
