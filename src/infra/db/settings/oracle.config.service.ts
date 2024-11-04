import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA;

@Injectable()
class OracleConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'oracle',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      serviceName: this.configService.get<string>('DATABASE_NAME'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + './../../../**/**/*.entity{.js,.ts}', 'node_modules/nestjs-admin/**/*.entity.js'],
      synchronize: false,
    };
  }
}

export { DATABASE_SCHEMA, OracleConfigService };
