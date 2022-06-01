import { DotenvConfigOutput, config } from 'dotenv';

const envFound: DotenvConfigOutput = config();

if (!envFound) {
    throw new Error('.env file was not found.');
}

const typeOrmConfig: any = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE,
    entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
    migrationsRun: false,
    logging: true,
    migrationsTableName: "migration",
    migrations: ["dist/migrations/*{.ts,.js}", "src/migrations/*{.ts,.js}"],
    cli: {
        migrationsDir: "src/migrations",
    },
}

export = typeOrmConfig;
