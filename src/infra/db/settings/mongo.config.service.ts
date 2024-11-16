import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA;

@Injectable()
class MongoDBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [join(__dirname, './../../../**/**/*.entity{.js,.ts}')],
      authSource: 'admin',
      synchronize: false,
      useUnifiedTopology: true,
    };
  }
}

export { DATABASE_SCHEMA, MongoDBConfigService };
