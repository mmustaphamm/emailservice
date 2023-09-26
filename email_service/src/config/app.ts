import * as path from "path";
import { IServer } from "./interface/app.interface";
import * as dotenv from "dotenv"
// dotenv.config({ path: path.join(__dirname, '../..', '.env') })
dotenv.config({ path: path.join(__dirname, '..', '.env') })
process.env.TZ ="Africa/Lagos"

export const server: IServer = {
    port: Number(process.env.PORT) as number,
    dateFormat: process.env.DATE_FORMAT as string,
    dateTimeFormat: process.env.DATE_TIME_FORMAT as string,
    env: process.env.APP_ENV as string
}