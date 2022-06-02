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
    synchronize: false,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrationsRun: false,
    logging: true,
    migrationsTableName: "migration",
    migrations: [`${__dirname}/../src/migration/*.{js,ts}`],
    cli: {
        migrationsDir: `${__dirname}/../src/migration`,
    },
}

export = typeOrmConfig;
