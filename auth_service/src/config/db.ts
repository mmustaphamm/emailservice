import { TokenBlacklist } from "../auth/token/token.entity"
import { Users } from "../auth/users.entity"
import { IORMMapper, Iredis } from "./interface/db.interface"
import * as dotenv from "dotenv"
import { Emails } from "../auth/email.entity"
import { Outbox } from "../email/outbox.entity"
dotenv.config()

const defaultDB: string = process.env.DB_CONNECTION as string


const mapper: IORMMapper = {
    typeorm: {
        type: "mysql",
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT) as number,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
        synchronize: true, // please never turn this to true
        logging: false,
        entities: [Users, TokenBlacklist, Emails, Outbox],
        migrations: [],
        migrationsTableName: "migration_table",
        subscribers: [],
    }
}

const redisOptions: Iredis = {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT) as number,
    password: process.env.REDIS_PASSWORD as string,
    // connectTimeout: 2 // optional
    // tls: {}
}

export default {
    defaultDB,
    mapper,
    redisOptions
}