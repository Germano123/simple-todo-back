import { Injectable } from "@nestjs/common";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "../../snake-naming.strategy";
import * as dotenv from "dotenv";

@Injectable()
export class ApiConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;

        dotenv.config({
            path: `.${nodeEnv}.env`,
        });

        console.info(`Using ${nodeEnv} environment.`);
    }

    get nodeEnv(): string {
        return this.get('ENVIRONMENT') || this.get('NODE_ENV') || 'local';
    }

    private get(key: string): string {
        if (process.env[key])
            return process.env[key];
        return null;
    }

    public getString(key: string): string {
        return String(this.get(key));
    }

    public getBoolean(key: string): boolean {
        if (this.get(key))
            return true;
        return false;
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get config() {
        return {
            port: this.getNumber("PORT"),
        };
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
        const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: 'postgres',
            host: this.getString('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.getString('DB_USERNAME'),
            password: this.getString('DB_PASSWORD'),
            database: this.getString('DB_DATABASE'),
            subscribers: [],
            migrationsRun: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        }
    }

    get documentation() {
        return {
            isEnabled: this.getBoolean("DOCUMENTATION_ENABLED"),
        };
    }

    get jwtConfig() {
        return {
            secret: this.getString('JWT_SECRET'),
            expiration: this.getString('JWT_EXPIRATION'),
        };
    }

    get awsConfig() {
        return {
            
        };
    }
}
