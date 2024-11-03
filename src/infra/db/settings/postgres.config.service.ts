import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA;

@Injectable()
class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + './../../../**/**/*.entity{.js,.ts}'],
      schema: this.configService.get<string>('DATABASE_SCHEMA'),
      synchronize: false,
    };
  }
}

export { DATABASE_SCHEMA, PostgresConfigService };
